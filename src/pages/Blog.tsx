import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Buying Used and Imported Cars in Kenya",
    excerpt: "Buying a car is a significant investment, and understanding the process can save you time, money, and stress. This comprehensive guide covers everything you need to know about purchasing used and imported cars in Kenya.",
    content: `
      <h2>Introduction</h2>
      <p>The Kenyan automotive market has grown significantly over the years, with a strong preference for imported vehicles due to their affordability and reliability. Whether you're a first-time buyer or looking to upgrade, this guide will help you navigate the process.</p>
      
      <h3>Understanding the Market</h3>
      <p>Kenya's used car market is dominated by Japanese imports, known for their fuel efficiency and durability. Popular models include Toyota, Nissan, Mazda, and Subaru. Understanding market trends and pricing is crucial before making a purchase.</p>
      
      <h3>Key Considerations When Buying</h3>
      <ul>
        <li><strong>Budget:</strong> Determine your budget including purchase price, import duties (if applicable), registration, and insurance.</li>
        <li><strong>Vehicle History:</strong> Always request a comprehensive vehicle history report to check for accidents, ownership records, and maintenance history.</li>
        <li><strong>Inspection:</strong> Have the vehicle inspected by a trusted mechanic before purchase. Check the engine, transmission, suspension, and body condition.</li>
        <li><strong>Documentation:</strong> Ensure all documents are genuine - logbook, import certificate, tax compliance certificate, and NTSA inspection certificate.</li>
      </ul>
      
      <h3>Import Process Overview</h3>
      <p>For imported vehicles, understanding the import process is essential:</p>
      <ol>
        <li>Vehicle purchase and shipping arrangement</li>
        <li>Payment of import duties and taxes</li>
        <li>NTSA inspection and registration</li>
        <li>Insurance and number plate issuance</li>
      </ol>
      
      <h3>Financing Options</h3>
      <p>Most Kenyan banks and SACCOs offer car financing with varying interest rates and terms. Shop around for the best rates and consider the total cost of financing over the loan period.</p>
      
      <h3>Conclusion</h3>
      <p>Buying a used or imported car in Kenya requires careful consideration and due diligence. Work with reputable dealers, get professional inspections, and ensure all documentation is in order. At Car Automart Limited, we're committed to making your car buying experience smooth and transparent.</p>
    `,
    date: "September 20, 2024",
    author: "Car Automart Team",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
  },
  {
    id: 2,
    title: "5 Key Benefits of Buying an Imported Car in Kenya",
    excerpt: "Imported cars have become the preferred choice for many Kenyan car buyers. Discover the top benefits that make imported vehicles an attractive option in the Kenyan market.",
    content: `
      <h2>Why Choose Imported Cars?</h2>
      <p>Imported cars, particularly from Japan, have dominated the Kenyan market for decades. Here are the five key benefits that make them an excellent choice.</p>
      
      <h3>1. Superior Value for Money</h3>
      <p>Imported vehicles, especially Japanese used cars, offer exceptional value compared to brand new vehicles. You can get a well-maintained, feature-rich car at a fraction of the cost of a new one. The depreciation curve for imported cars is more favorable, meaning better resale value.</p>
      
      <h3>2. Advanced Technology and Features</h3>
      <p>Many imported cars come with advanced features that might not be available or affordable in locally assembled vehicles. These include:</p>
      <ul>
        <li>Advanced safety systems (ABS, airbags, stability control)</li>
        <li>Modern infotainment systems</li>
        <li>Fuel-efficient engines</li>
        <li>Climate control systems</li>
        <li>Premium interior finishes</li>
      </ul>
      
      <h3>3. Proven Reliability and Durability</h3>
      <p>Japanese cars are renowned worldwide for their reliability and longevity. With proper maintenance, these vehicles can serve you for many years. The strict inspection standards in Japan (Shaken) ensure that even used cars are in excellent condition.</p>
      
      <h3>4. Wide Selection and Availability</h3>
      <p>The imported car market offers an extensive selection of models, years, and specifications. Whether you need a compact city car, a family SUV, or a luxury sedan, you'll find numerous options to choose from. This variety allows you to find exactly what suits your needs and budget.</p>
      
      <h3>5. Lower Running Costs</h3>
      <p>Imported cars, particularly Japanese models, are designed for fuel efficiency. Spare parts are readily available in Kenya at competitive prices due to the large market. Additionally, many local mechanics are familiar with these vehicles, making maintenance affordable.</p>
      
      <h3>Making the Right Choice</h3>
      <p>When buying an imported car:</p>
      <ul>
        <li>Work with reputable dealers who verify vehicle history</li>
        <li>Consider the availability of spare parts</li>
        <li>Check fuel consumption ratings</li>
        <li>Ensure the car meets your specific needs</li>
        <li>Budget for insurance and maintenance</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>Imported cars offer Kenyan buyers an unbeatable combination of value, quality, and variety. At Car Automart Limited, we specialize in sourcing and selling quality imported vehicles with full transparency on vehicle history and condition. Visit us today to explore our extensive inventory.</p>
    `,
    date: "September 20, 2024",
    author: "Car Automart Team",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-display font-bold mb-4">
            Our <span className="text-brand-red">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert insights, tips, and guides for car buyers in Kenya
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-8">
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                </div>

                <h2 className="text-3xl font-display font-bold mb-4">
                  {post.title}
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  {post.excerpt}
                </p>

                <div 
                  className="prose prose-lg max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
