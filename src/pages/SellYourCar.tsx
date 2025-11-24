import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SellYourCar = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<File[]>([]);
  const [requestPrice, setRequestPrice] = useState("no");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Check total number of images
    if (images.length + files.length > 10) {
      toast({
        title: "Upload Limit Exceeded",
        description: "You can upload a maximum of 10 images.",
        variant: "destructive",
      });
      return;
    }

    // Check file size
    const invalidFiles = files.filter((file) => file.size > 4194304); // 4MB in bytes
    if (invalidFiles.length > 0) {
      toast({
        title: "File Size Error",
        description: "Each image must be less than 4MB.",
        variant: "destructive",
      });
      return;
    }

    setImages([...images, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Vehicle Submitted!",
      description: "Your vehicle details have been submitted successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-display font-bold mb-8">Sell Your Car</h1>

          <form onSubmit={handleSubmit}>
            {/* Vehicle Details */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Add Vehicle Details</CardTitle>
                <CardDescription>
                  If the title is not entered then it will be auto-generated using Year, Make, and Model.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="year">
                      Year <span className="text-destructive">*</span>
                    </Label>
                    <Input id="year" type="number" placeholder="2024" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="make">
                      Make <span className="text-destructive">*</span>
                    </Label>
                    <Input id="make" placeholder="Toyota" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">
                      Model <span className="text-destructive">*</span>
                    </Label>
                    <Input id="model" placeholder="Corolla" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Number</Label>
                    <Input id="stock" placeholder="ST12345" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chassis">Chasis Number</Label>
                    <Input id="chassis" placeholder="CH12345" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regular-price">
                      Regular Price <span className="text-destructive">*</span>
                    </Label>
                    <Input id="regular-price" type="number" placeholder="1500000" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sale-price">Sale Price</Label>
                    <Input id="sale-price" type="number" placeholder="1450000" />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Enable Request Price</Label>
                  <RadioGroup value={requestPrice} onValueChange={setRequestPrice}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no" className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {requestPrice === "yes" && (
                  <div className="space-y-2">
                    <Label htmlFor="price-label">Request Price Label</Label>
                    <Input id="price-label" placeholder="Call for Price" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Vehicle Images */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Vehicle Images</CardTitle>
                <CardDescription>
                  Upload up to 10 images. Maximum file size: 4 MB per image.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      Drag and drop images here, OR
                    </p>
                    <Label
                      htmlFor="file-upload"
                      className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                      Choose Files
                    </Label>
                    <Input
                      id="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground">
                    {images.length} / 10 images uploaded
                  </p>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full">
              Submit Details
            </Button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SellYourCar;
