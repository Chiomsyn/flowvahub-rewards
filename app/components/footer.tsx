import Link from "next/link";
import { Award, Twitter, Linkedin, Instagram, Github } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    Product: [
      { name: "Rewards", href: "/rewards" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "Pricing", href: "/pricing" },
      { name: "API", href: "/api" },
    ],
    Company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
    Legal: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Security", href: "/security" },
      { name: "Cookies", href: "/cookies" },
    ],
    Support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Status", href: "/status" },
      { name: "Community", href: "/community" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/flowvahub", label: "Twitter" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/flowvahub",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/flowvahub",
      label: "Instagram",
    },
    { icon: Github, href: "https://github.com/flowvahub", label: "GitHub" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">FlowvaHub</p>
                <p className="text-primary-400 font-semibold">Rewards</p>
              </div>
            </div>
            <p className="text-gray-400 max-w-md mb-6">
              Transforming engagement into valuable rewards. Join thousands of
              users who are already earning amazing perks for their
              participation.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} FlowvaHub Rewards. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/sitemap" className="hover:text-white">
              Sitemap
            </Link>
            <Link href="/accessibility" className="hover:text-white">
              Accessibility
            </Link>
            <Link href="/manage-cookies" className="hover:text-white">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
