import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  company_name: z.string().min(2, "Company name must be at least 2 characters"),
  vat_number: z.string().min(2, "VAT number must be at least 2 characters"),
  contact_name: z.string().min(2, "Contact name must be at least 2 characters"),
  phone: z.string().min(6, "Phone number must be at least 6 characters"),
});

export default function VendorAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      company_name: "",
      vat_number: "",
      contact_name: "",
      phone: "",
    },
  });

  const onLogin = async (values: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true);
      console.log("Login attempt with email:", values.email);
      
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (signInError) {
        console.error("Login error:", signInError);
        toast.error(signInError.message);
        return;
      }

      if (!signInData.user) {
        toast.error("No user found");
        return;
      }

      // Verify the user is a vendor
      const { data: vendorData, error: vendorError } = await supabase
        .from('vendors')
        .select('*')
        .eq('user_id', signInData.user.id)
        .single();

      if (vendorError || !vendorData) {
        console.error("Vendor verification error:", vendorError);
        toast.error("Account not found or not authorized as vendor");
        // Sign out the user since they're not a vendor
        await supabase.auth.signOut();
        return;
      }

      toast.success("Logged in successfully");
      navigate("/vendor/dashboard");
    } catch (error: any) {
      console.error("Unexpected login error:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (values: z.infer<typeof registerSchema>) => {
    try {
      setIsLoading(true);
      console.log("Starting registration process for:", values.email);
      
      // Check if user already exists
      const { data: { users }, error: getUserError } = await supabase.auth.admin.listUsers();
      const existingUser = users?.find(user => user.email === values.email);
      
      if (existingUser) {
        toast.error("An account with this email already exists. Please log in instead.");
        setIsLogin(true);
        return;
      }

      // Create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (authError) {
        console.error("Auth signup error:", authError);
        toast.error(authError.message || "Failed to create account");
        return;
      }

      if (!authData.user) {
        toast.error("Failed to create user account");
        return;
      }

      console.log("Auth user created successfully:", authData.user.id);

      // Create the vendor record
      const { error: vendorError } = await supabase
        .from("vendors")
        .insert([
          {
            user_id: authData.user.id,
            company_name: values.company_name,
            vat_number: values.vat_number,
            contact_name: values.contact_name,
            phone: values.phone,
          },
        ]);

      if (vendorError) {
        console.error("Vendor creation error:", vendorError);
        // If vendor creation fails, we should clean up the auth user
        await supabase.auth.signOut();
        toast.error(`Failed to create vendor profile: ${vendorError.message}`);
        return;
      }

      console.log("Vendor record created successfully");
      toast.success("Registration successful! Please check your email to verify your account.");
      setIsLogin(true);
    } catch (error: any) {
      console.error("Unexpected registration error:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-booking-primary">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-white text-2xl font-bold">Booking.com</div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white hover:text-booking-accent">
              Vendor Portal
            </a>
            <a href="#" className="text-white hover:text-booking-accent">
              List your property
            </a>
            <Button 
              variant="secondary"
              className="bg-booking-accent hover:bg-booking-accent/90 text-booking-secondary font-semibold"
            >
              Sign in
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex gap-4 mb-6">
            <Button
              type="button"
              variant={isLogin ? "default" : "ghost"}
              onClick={() => setIsLogin(true)}
              disabled={isLoading}
              className={`flex-1 ${isLogin ? 'bg-booking-primary text-white hover:bg-booking-primary/90' : ''}`}
            >
              Login
            </Button>
            <Button
              type="button"
              variant={!isLogin ? "default" : "ghost"}
              onClick={() => setIsLogin(false)}
              disabled={isLoading}
              className={`flex-1 ${!isLogin ? 'bg-booking-primary text-white hover:bg-booking-primary/90' : ''}`}
            >
              Register
            </Button>
          </div>

          {isLogin ? (
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="email@example.com" 
                          type="email"
                          disabled={isLoading}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          disabled={isLoading}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-booking-primary hover:bg-booking-primary/90 text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Login"}
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...registerForm}>
              <form
                onSubmit={registerForm.handleSubmit(onRegister)}
                className="space-y-4"
              >
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="email@example.com" 
                          type="email"
                          disabled={isLoading}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password"
                          disabled={isLoading}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input 
                          disabled={isLoading}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="vat_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VAT Number</FormLabel>
                      <FormControl>
                        <Input 
                          disabled={isLoading}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="contact_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name</FormLabel>
                      <FormControl>
                        <Input 
                          disabled={isLoading}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input 
                          disabled={isLoading}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-booking-primary hover:bg-booking-primary/90 text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Register"}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}