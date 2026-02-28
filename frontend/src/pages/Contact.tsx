import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission delay
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-grey-light min-h-screen">
      {/* Header */}
      <div className="bg-navy py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-3">
            Contact Us
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Have questions? We're here to help you choose the right course.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="academy-card p-6 md:p-8">
            <h2 className="font-display font-semibold text-xl text-navy mb-6">Send Us a Message</h2>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                <h3 className="font-display font-semibold text-xl text-navy mb-2">Message Sent!</h3>
                <p className="text-grey-dark text-sm mb-5">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }); }}
                  className="text-sky-accent hover:underline text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-navy font-medium mb-1.5 block">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    required
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contact-email" className="text-navy font-medium mb-1.5 block">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contact-phone" className="text-navy font-medium mb-1.5 block">
                    Phone Number
                  </Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-navy font-medium mb-1.5 block">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    required
                    placeholder="How can we help you?"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3 h-auto"
                >
                  {submitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="academy-card p-6">
              <h2 className="font-display font-semibold text-xl text-navy mb-5">Get in Touch</h2>
              <div className="space-y-4">
                <a href="tel:+911234567890" className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0 group-hover:bg-navy transition-colors">
                    <Phone className="w-5 h-5 text-navy group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-grey-dark uppercase tracking-wide">Phone</p>
                    <p className="font-medium text-navy">+91 12345 67890</p>
                  </div>
                </a>
                <a href="mailto:info@skillupacademy.in" className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0 group-hover:bg-navy transition-colors">
                    <Mail className="w-5 h-5 text-navy group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-grey-dark uppercase tracking-wide">Email</p>
                    <p className="font-medium text-navy">info@skillupacademy.in</p>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <p className="text-xs text-grey-dark uppercase tracking-wide">Address</p>
                    <p className="font-medium text-navy text-sm">123 Training Street, Tech Park,<br />Bangalore - 560001</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/911234567890?text=Hi%2C%20I%20want%20to%20know%20more%20about%20your%20courses"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 academy-card p-5 hover:shadow-card-hover transition-shadow group"
            >
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <SiWhatsapp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-navy group-hover:text-sky-accent transition-colors">
                  Chat on WhatsApp
                </p>
                <p className="text-grey-dark text-sm">Quick responses during business hours</p>
              </div>
              <MessageCircle className="w-5 h-5 text-grey-dark ml-auto" />
            </a>

            {/* Map Placeholder */}
            <div className="academy-card overflow-hidden">
              <div className="bg-grey-mid h-48 flex flex-col items-center justify-center text-center p-6">
                <MapPin className="w-10 h-10 text-grey-dark mb-3" />
                <p className="font-medium text-navy text-sm mb-1">Location Map</p>
                <p className="text-grey-dark text-xs leading-relaxed">
                  Google Maps embed requires an API key not available in this environment.
                  Visit us at 123 Training Street, Tech Park, Bangalore.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
