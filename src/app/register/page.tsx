"use client";
import Link from "next/link";
import "./register.css";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Building2, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { UserService } from "@/services/user.service";
import { useRouter } from "next/navigation";
import { openNotificationWithIcon } from "@/ultils/notification";

export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: Role;
  companyName?: string;
  age?: string;
  address?: string;
  description?: string;
  avatar?: string;
  password: string;
  isVerified?: boolean;
}

// Thêm enum Role nếu chưa có
enum Role {
  CUSTOMER = "customer",
  SERVICE_PROVIDER = "service_provider",
}

// Giả sử bạn có BaseService được import từ đâu đó
// import { BaseService } from './path-to-your-base-service';

const Register: React.FC = () => {
  const [formData, setFormData] = useState<CreateUser>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: Role.CUSTOMER, // Đảm bảo mặc định là CUSTOMER
    companyName: "",
    age: "",
    address: "",
    description: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (value: string) => {
    const role = value as Role;
    setFormData((prev) => ({
      ...prev,
      role,

      companyName: role === Role.CUSTOMER ? "" : prev.companyName,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate form
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password
      ) {
        throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc");
      }

      if (formData.role === Role.SERVICE_PROVIDER && !formData.companyName) {
        throw new Error("Vui lòng điền tên công ty cho service provider");
      }

      const dataToSend: CreateUser = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        isVerified: true
      };

      if (formData.phone) dataToSend.phone = formData.phone;
      if (formData.age) dataToSend.age = formData.age;
      if (formData.address) dataToSend.address = formData.address;
      if (formData.description) dataToSend.description = formData.description;
      if (formData.avatar) dataToSend.avatar = formData.avatar;

      // Add companyName only for service_provider
      if (formData.role === Role.SERVICE_PROVIDER && formData.companyName) {
        dataToSend.companyName = formData.companyName;
      }

      const result = await UserService.createUser(dataToSend);
      if (result.data.data) {
        // Redirect to login page after successful registration
        openNotificationWithIcon(
          "success",
          "Đăng ký thành công",
          "Bạn đã đăng ký tài khoản thành công. Vui lòng đăng nhập để tiếp tục."
        );
        router.push("/login");
      } else {
        throw new Error("Đăng ký không thành công, vui lòng thử lại sau");
      }
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra khi đăng ký");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8"
      style={{
        backgroundImage: `url('https://wallpaperfx.com/view_image/beautiful-australian-shepherd-1920x1080-wallpaper-14732.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Create Account
          </CardTitle>
          <CardDescription className="text-base">
            Enter your information to create your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Age and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Tell us about yourself"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            {/* Role Selection */}
            <div className="space-y-3">
              <Label>Account Type *</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={handleRoleChange}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={Role.CUSTOMER} id="customer" />
                  <User className="h-4 w-4 text-gray-600" />
                  <Label htmlFor="customer" className="flex-1 cursor-pointer">
                    <div className="font-medium">Customer</div>
                    <div className="text-sm text-gray-500">
                      Looking for services
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={Role.SERVICE_PROVIDER} id="provider" />
                  <Building2 className="h-4 w-4 text-gray-600" />
                  <Label htmlFor="provider" className="flex-1 cursor-pointer">
                    <div className="font-medium">Service Provider</div>
                    <div className="text-sm text-gray-500">
                      Offering services to customers
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Company Name - conditional */}
            {formData.role === Role.SERVICE_PROVIDER && (
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="Enter your company name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required={formData.role === Role.SERVICE_PROVIDER}
                />
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 text-base font-medium"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
