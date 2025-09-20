import { Heart, Globe, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">भ</span>
              </div>
              <span className="font-bold">Bharat Pashudhan</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering Field Level Workers with advanced breed identification 
              and livestock management tools.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/breeds" className="hover:text-foreground transition-colors">Breed Guide</a></li>
              <li><a href="/classifier" className="hover:text-foreground transition-colors">AI Classifier</a></li>
              <li><a href="/training" className="hover:text-foreground transition-colors">Training Center</a></li>
              <li><a href="/validation" className="hover:text-foreground transition-colors">Data Validation</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Support Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Community Forum</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:support@bharatpashudhan.gov.in" className="hover:text-foreground transition-colors">
                  support@bharatpashudhan.gov.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91-11-2345-6789</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>12 Languages Supported</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-muted-foreground">
            © 2024 Bharat Pashudhan. All rights reserved. | Government of India Initiative
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 text-red-500" /> for Indian farmers
          </div>
        </div>
      </div>
    </footer>
  );
}