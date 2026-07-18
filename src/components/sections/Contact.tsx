import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import Linkedin from '../ui/LinkedinIcon';
import Magnetic from '../ui/Magnetic';

interface FormFields {
  firstName: string;
  lastName: string;
  phone: string;
  subject: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [fields, setFields] = useState<FormFields>({
    firstName: '',
    lastName: '',
    phone: '',
    subject: '',
    email: '',
    message: '',
  });

  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const [shakeFields, setShakeFields] = useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name: keyof FormFields, value: string): string => {
    if (!value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }
    if (name === 'phone') {
      const phoneRegex = /^[+]?[0-9]{8,15}$/;
      if (!phoneRegex.test(value.replace(/\s/g, ''))) {
        return 'Please enter a valid phone number';
      }
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormFields]) {
      const err = validateField(name as keyof FormFields, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name as keyof FormFields, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof FormFields, string>> = {};
    let hasErrors = false;

    (Object.keys(fields) as Array<keyof FormFields>).forEach((key) => {
      const err = validateField(key, fields[key]);
      if (err) {
        newErrors[key] = err;
        hasErrors = true;
        setShakeFields((prev) => ({ ...prev, [key]: true }));
        setTimeout(() => {
          setShakeFields((prev) => ({ ...prev, [key]: false }));
        }, 500);
      }
    });

    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      phone: true,
      subject: true,
      email: true,
      message: true,
    });

    if (hasErrors) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#8B5CF6', '#A3E635', '#A78BFA'],
    });

    setTimeout(() => {
      setFields({
        firstName: '',
        lastName: '',
        phone: '',
        subject: '',
        email: '',
        message: '',
      });
      setTouched({});
      setIsSubmitted(false);
    }, 4000);
  };

  const shakeVariants = {
    shake: {
      x: [0, -8, 8, -8, 8, -4, 4, 0],
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="contact" className="py-24 bg-bgDark border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-block text-xs font-semibold text-accent-lime uppercase tracking-wider">
                06 / Contact
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                Let's Start a Conversation
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Have a question or looking to build a scalable web application? Drop a message and let's coordinate.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">Email</p>
                  <a href="mailto:logeshwarans159@gmail.com" className="text-sm font-medium text-white hover:text-accent-lime transition-colors">
                    logeshwarans159@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">Phone</p>
                  <a href="tel:+919342787758" className="text-sm font-medium text-white hover:text-accent-lime transition-colors">
                    +91 93427 87758
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">Location</p>
                  <p className="text-sm font-medium text-white">Chennai, Tamil Nadu</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Magnetic>
                <a
                  href="https://linkedin.com/in/logeshwaran-selvam"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-accent hover:border-accent/40 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white/[0.01] border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-xs font-semibold text-white/60">First Name</label>
                  <motion.input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={fields.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variants={shakeVariants}
                    animate={shakeFields.firstName ? 'shake' : ''}
                    className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors ${
                      touched.firstName
                        ? errors.firstName
                          ? 'border-red-500/50 focus:border-red-500'
                          : 'border-green-500/30 focus:border-green-500/80'
                        : 'border-white/10 focus:border-accent'
                    }`}
                  />
                  {touched.firstName && errors.firstName && (
                    <p className="text-[11px] text-red-400">{errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-xs font-semibold text-white/60">Last Name</label>
                  <motion.input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={fields.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variants={shakeVariants}
                    animate={shakeFields.lastName ? 'shake' : ''}
                    className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors ${
                      touched.lastName
                        ? errors.lastName
                          ? 'border-red-500/50 focus:border-red-500'
                          : 'border-green-500/30 focus:border-green-500/80'
                        : 'border-white/10 focus:border-accent'
                    }`}
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="text-[11px] text-red-400">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-semibold text-white/60">Phone</label>
                  <motion.input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={fields.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variants={shakeVariants}
                    animate={shakeFields.phone ? 'shake' : ''}
                    placeholder="+91 93427 87758"
                    className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors ${
                      touched.phone
                        ? errors.phone
                          ? 'border-red-500/50 focus:border-red-500'
                          : 'border-green-500/30 focus:border-green-500/80'
                        : 'border-white/10 focus:border-accent'
                    }`}
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-[11px] text-red-400">{errors.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold text-white/60">Email</label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={fields.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variants={shakeVariants}
                    animate={shakeFields.email ? 'shake' : ''}
                    className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors ${
                      touched.email
                        ? errors.email
                          ? 'border-red-500/50 focus:border-red-500'
                          : 'border-green-500/30 focus:border-green-500/80'
                        : 'border-white/10 focus:border-accent'
                    }`}
                  />
                  {touched.email && errors.email && (
                    <p className="text-[11px] text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-semibold text-white/60">Subject</label>
                <motion.input
                  type="text"
                  id="subject"
                  name="subject"
                  value={fields.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variants={shakeVariants}
                  animate={shakeFields.subject ? 'shake' : ''}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors ${
                    touched.subject
                      ? errors.subject
                        ? 'border-red-500/50 focus:border-red-500'
                        : 'border-green-500/30 focus:border-green-500/80'
                      : 'border-white/10 focus:border-accent'
                  }`}
                />
                {touched.subject && errors.subject && (
                  <p className="text-[11px] text-red-400">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-semibold text-white/60">Message</label>
                <motion.textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={fields.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variants={shakeVariants}
                  animate={shakeFields.message ? 'shake' : ''}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors resize-none ${
                    touched.message
                      ? errors.message
                        ? 'border-red-500/50 focus:border-red-500'
                        : 'border-green-500/30 focus:border-green-500/80'
                      : 'border-white/10 focus:border-accent'
                  }`}
                />
                {touched.message && errors.message && (
                  <p className="text-[11px] text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Magnetic>
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-white shadow-lg transition-all duration-300 ${
                      isSubmitted
                        ? 'bg-green-600 shadow-green-600/25'
                        : 'bg-accent hover:bg-accent-dark shadow-accent/25 disabled:bg-accent/50'
                    }`}
                  >
                    {isSubmitted ? (
                      <>
                        Message Sent <Check size={18} />
                      </>
                    ) : isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
