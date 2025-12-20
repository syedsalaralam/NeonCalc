import React from 'react';

export const PrivacyPolicy: React.FC = () => (
  <div className="glass-panel p-8 rounded-2xl max-w-4xl mx-auto prose prose-invert">
    <h1 className="text-3xl font-display text-neon-blue mb-6">Privacy Policy</h1>
    <p className="text-slate-400 mb-4">Last Updated: October 2023</p>
    <p>At NeonCalc & Play, we value your privacy. This policy explains how we handle your data.</p>
    <h2 className="text-xl text-white mt-6 mb-2">1. Information We Collect</h2>
    <p>We do not collect personal identification information. We may collect anonymous usage data to improve our tools.</p>
    <h2 className="text-xl text-white mt-6 mb-2">2. Advertising</h2>
    <p>We use third-party advertising companies (like Google AdSense) to serve ads when you visit our website. These companies may use cookies to serve ads based on your prior visits.</p>
    <h2 className="text-xl text-white mt-6 mb-2">3. Cookies</h2>
    <p>Cookies are small files stored on your device. You can choose to disable cookies through your browser settings.</p>
    <h2 className="text-xl text-white mt-6 mb-2">4. Contact Us</h2>
    <p>If you have questions about this policy, please contact us via our official support channels.</p>
  </div>
);

export const TermsOfService: React.FC = () => (
  <div className="glass-panel p-8 rounded-2xl max-w-4xl mx-auto prose prose-invert">
    <h1 className="text-3xl font-display text-neon-pink mb-6">Terms of Service</h1>
    <p className="text-slate-400 mb-4">Effective Date: October 2023</p>
    <h2 className="text-xl text-white mt-6 mb-2">1. Use of Service</h2>
    <p>By using NeonCalc & Play, you agree to use the services for lawful purposes and in a way that does not infringe the rights of others.</p>
    <h2 className="text-xl text-white mt-6 mb-2">2. Disclaimer</h2>
    <p>The tools provided are for educational and informational purposes. While we strive for 100% accuracy, we are not responsible for errors in calculations or data conversions.</p>
    <h2 className="text-xl text-white mt-6 mb-2">3. Intellectual Property</h2>
    <p>All content and design on this site are the property of NeonCalc & Play.</p>
  </div>
);

export const AboutUs: React.FC = () => (
  <div className="glass-panel p-8 rounded-2xl max-w-4xl mx-auto text-center">
    <h1 className="text-4xl font-display text-white mb-6">About <span className="text-neon-blue">NeonCalc</span></h1>
    <div className="max-w-2xl mx-auto space-y-6 text-slate-300 leading-relaxed text-lg">
      <p>
        Founded in 2023, NeonCalc was born from a simple idea: educational tools shouldn't be boring. 
        We combined cutting-edge web technology with futuristic aesthetics to create a suite of tools 
        that users actually enjoy using.
      </p>
      <p>
        Our mission is to provide free, high-quality mathematical and scientific utilities to everyone, 
        regardless of their location or background. By integrating AI into our learning games, we provide 
        a personalized experience that evolves with the user.
      </p>
      <div className="pt-8 grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
          <div className="text-neon-pink font-bold">Innovation</div>
          <div className="text-sm text-slate-500 uppercase">First approach</div>
        </div>
        <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
          <div className="text-neon-blue font-bold">Accuracy</div>
          <div className="text-sm text-slate-500 uppercase">Always verified</div>
        </div>
      </div>
    </div>
  </div>
);