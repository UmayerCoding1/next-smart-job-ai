"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Brain,
  Zap,
  Target,
  TrendingUp,
  MessageSquare,
  FileText,
  Users,
  BarChart3,
  Sparkles,
  Cpu,
  Eye,
  Play,
  RefreshCw,
  ChevronRight,
  Bot,
  Lightbulb,
  Rocket,
  Shield,
} from "lucide-react"

export default function AIFeaturesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [aiProcessing, setAiProcessing] = useState(false)
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  const [aiInsights, setAiInsights] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAiInsights((prev) => (prev + 1) % 100)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const aiFeatures = [
    {
      id: 1,
      title: "AI Job Matching Engine",
      description: "Advanced ML algorithms analyze your profile and match you with perfect opportunities",
      category: "Job Discovery",
      icon: Target,
      status: "Live",
      accuracy: 94,
      color: "from-blue-500 to-cyan-500",
      demo: "job-matching",
      insights: "1,247 jobs analyzed in real-time",
    },
    {
      id: 2,
      title: "Smart Resume Optimizer",
      description: "AI-powered resume analysis with real-time optimization suggestions",
      category: "Profile Enhancement",
      icon: FileText,
      status: "Processing",
      accuracy: 89,
      color: "from-green-500 to-emerald-500",
      demo: "resume-optimizer",
      insights: "Resume score improved by 34%",
    },
    {
      id: 3,
      title: "Interview AI Coach",
      description: "Personalized interview preparation with AI-generated questions and feedback",
      category: "Interview Prep",
      icon: MessageSquare,
      status: "Live",
      accuracy: 92,
      color: "from-purple-500 to-pink-500",
      demo: "interview-coach",
      insights: "87% success rate improvement",
    },
    {
      id: 4,
      title: "Salary Intelligence",
      description: "Real-time salary predictions and market analysis powered by AI",
      category: "Market Insights",
      icon: TrendingUp,
      status: "Live",
      accuracy: 96,
      color: "from-orange-500 to-red-500",
      demo: "salary-intelligence",
      insights: "$15K average salary increase",
    },
    {
      id: 5,
      title: "AI Career Pathfinder",
      description: "Intelligent career progression recommendations based on your goals",
      category: "Career Planning",
      icon: Rocket,
      status: "Beta",
      accuracy: 88,
      color: "from-indigo-500 to-purple-500",
      demo: "career-pathfinder",
      insights: "3.2x faster career growth",
    },
    {
      id: 6,
      title: "Smart Company Insights",
      description: "AI-driven company analysis with culture fit predictions",
      category: "Company Research",
      icon: Users,
      status: "Live",
      accuracy: 91,
      color: "from-teal-500 to-blue-500",
      demo: "company-insights",
      insights: "500+ companies analyzed daily",
    },
  ]

  const filteredFeatures = aiFeatures.filter((feature) => {
    const matchesSearch =
      feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleStartDemo = (demoId: string) => {
    setActiveDemo(demoId)
    setAiProcessing(true)
    setTimeout(() => {
      setAiProcessing(false)
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-100 text-green-800 border-green-200"
      case "Processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Beta":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                AI Features Hub
                <Sparkles className="w-6 h-6 text-yellow-500" />
              </h1>
              <p className="text-blue-600 text-sm mt-1 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                Powered by advanced machine learning • {filteredFeatures.length} AI tools active
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search AI features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
              />
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              <Bot className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm">AI Processing Power</p>
                  <p className="text-2xl font-bold text-gray-900">98.7%</p>
                </div>
                <Zap className="w-8 h-8 text-yellow-500" />
              </div>
              <Progress value={98.7} className="mt-3" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm">Jobs Analyzed Today</p>
                  <p className="text-2xl font-bold text-gray-900">12,847</p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-green-600 text-xs mt-2">+23% from yesterday</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm">AI Accuracy Rate</p>
                  <p className="text-2xl font-bold text-gray-900">94.2%</p>
                </div>
                <Target className="w-8 h-8 text-purple-500" />
              </div>
              <p className="text-purple-600 text-xs mt-2">Continuously improving</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm">Real-time Insights</p>
                  <p className="text-2xl font-bold text-gray-900">{aiInsights}</p>
                </div>
                <Lightbulb className="w-8 h-8 text-orange-500" />
              </div>
              <p className="text-orange-600 text-xs mt-2">Updated every 2 seconds</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFeatures.map((feature) => {
            const IconComponent = feature.icon
            const isActive = activeDemo === feature.demo
            return (
              <Card
                key={feature.id}
                className="bg-white border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{feature.title}</h3>
                        <Badge className={`${getStatusColor(feature.status)} text-xs`}>
                          {feature.status === "Live" && "🟢"} {feature.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{feature.accuracy}%</p>
                      <p className="text-xs text-gray-500">Accuracy</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{feature.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Category</p>
                      <Badge variant="outline" className="text-blue-600 border-blue-300">
                        {feature.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">AI Insights</p>
                      <p className="text-sm text-green-600">{feature.insights}</p>
                    </div>
                  </div>

                  {isActive && aiProcessing && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
                        <p className="text-sm text-blue-600">AI Processing...</p>
                      </div>
                      <Progress value={75} />
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => handleStartDemo(feature.demo)}
                      className={`flex-1 ${
                        isActive
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      } text-white`}
                      disabled={aiProcessing}
                    >
                      {isActive ? (
                        <>
                          <Shield className="w-4 h-4 mr-2" />
                          Active
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Try Demo
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-700 border-gray-300 hover:bg-gray-50 bg-transparent"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>

                <div className={`h-1 bg-gradient-to-r ${feature.color} ${isActive ? "animate-pulse" : ""}`} />
              </Card>
            )
          })}
        </div>

        <Card className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">AI Career Assistant</h3>
                  <p className="text-indigo-600 text-sm">Get personalized career guidance powered by AI</p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white">
                Start Conversation
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
