import Link from "next/link";
import {
  ArrowRight,
  Award,
  Zap,
  Star,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import Navbar from "./components/navbar";
import { features, rewards, stats } from "./constant";
import Footer from "./components/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-gradient-to-r from-gray-50 to-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-secondary-50/50" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-success-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-medium text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>Join 10,000+ users earning rewards</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block text-gray-900">Unlock Amazing</span>
                <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Rewards & Perks
                </span>
              </h1>

              <p className="text-xl text-gray-600 max-w-lg">
                Transform your engagement into valuable rewards. Earn points,
                claim exclusive perks, and join a community that rewards your
                participation.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/rewards"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
                >
                  <Award className="w-5 h-5" />
                  Browse Rewards
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Trusted by 10K+ users
                  </p>
                  <p className="text-sm text-gray-500">4.8/5 average rating</p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl">
                {/* Mock Rewards Dashboard */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Your Rewards Dashboard
                      </h3>
                      <p className="text-gray-500">
                        Available Points:{" "}
                        <span className="font-bold text-primary-600">
                          2,450
                        </span>
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Gift Cards",
                      "Premium Access",
                      "Exclusive Events",
                      "Merchandise",
                    ].map((category, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-100"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center mb-2">
                          <Star className="w-4 h-4 text-primary-600" />
                        </div>
                        <p className="font-semibold text-gray-900">
                          {category}
                        </p>
                        <p className="text-sm text-gray-500">From 500 points</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">
                          Limited Time Offer
                        </p>
                        <p className="text-sm text-gray-600">
                          Double points this week!
                        </p>
                      </div>
                      <div className="px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full text-white text-sm font-semibold">
                        🔥 Hot
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl shadow-xl flex items-center justify-center">
                <div className="text-center text-primary-400">
                  <p className="text-2xl font-bold">+50%</p>
                  <p className="text-xs">Bonus</p>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary-400 to-secondary-600 shadow-xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose FlowvaHub Rewards?
            </h2>
            <p className="text-xl text-gray-600">
              We've built a rewards platform that actually values your
              engagement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-primary-100 hover:shadow-2xl transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <CheckCircle className="w-5 h-5 text-success-500" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards Showcase */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Rewards
            </h2>
            <p className="text-xl text-gray-600">
              See what our community is redeeming
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {rewards.map((reward, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm">
                        <Award className="w-3 h-3" />
                        <span>{reward.points}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700">
                        {reward.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {reward.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {reward.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        🔥 {reward.redeemed} redeemed this week
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          reward.stock > 10
                            ? "text-success-600"
                            : "text-amber-600"
                        }`}
                      >
                        {reward.stock} left
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/rewards"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              View All Rewards
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-4">
                <p className="text-5xl font-bold">{stat.value}</p>
                <p className="text-xl font-semibold">{stat.label}</p>
                <p className="text-primary-200">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already transforming their
              engagement into amazing rewards
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Started Free
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
              >
                Sign In
              </Link>
            </div>

            <p className="mt-8 text-gray-500 text-sm">
              No credit card required • Get 1000 welcome points • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
