"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain, DollarSign, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

const AiJobMatch = () => {
  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-900 flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-600" />
          AI-Powered Job Matches
        </CardTitle>
        <CardDescription>
          Intelligent matching based on skills, experience, and career goals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {[
          {
            title: "Senior Frontend Developer",
            company: "TechCorp Inc.",
            location: "San Francisco, CA",
            salary: "$120k - $150k",
            match: 97,
            logo: "TC",
            aiReason: "Perfect React & TypeScript match",
            urgency: "High",
          },
          {
            title: "React Developer",
            company: "StartupXYZ",
            location: "Remote",
            salary: "$100k - $130k",
            match: 92,
            logo: "SX",
            aiReason: "Remote preference + skill alignment",
            urgency: "Medium",
          },
          {
            title: "Full Stack Engineer",
            company: "InnovateLab",
            location: "New York, NY",
            salary: "$110k - $140k",
            match: 88,
            logo: "IL",
            aiReason: "Growth trajectory match",
            urgency: "Low",
          },
        ].map((job, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 via-white to-indigo-50 
             rounded-xl hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all border border-blue-100"
          >
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-blue-500/90 text-white font-bold text-sm">
                  {job.logo}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-blue-900 tracking-tight">
                  {job.title}
                </h4>
                <p className="text-sm text-blue-700">{job.company}</p>
                <div className="flex items-center gap-4 text-xs text-blue-600 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 opacity-80" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3 opacity-80" />
                    {job.salary}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant="outline"
                    className="text-xs bg-blue-100/70 text-blue-800 flex items-center"
                  >
                    <Brain className="w-3 h-3 mr-1 opacity-80" />
                    {job.aiReason || "Looks like a good fit"}
                  </Badge>
                  <Badge
                    className={`text-xs flex items-center gap-1 ${
                      job.urgency === "High"
                        ? "bg-red-100/80 text-red-700"
                        : job.urgency === "Medium"
                        ? "bg-orange-100/80 text-orange-700"
                        : "bg-green-100/80 text-green-700"
                    }`}
                  >
                    {job.urgency === "High"
                      ? "🔥"
                      : job.urgency === "Medium"
                      ? "⚡"
                      : "✅"}
                    {job.urgency} Priority
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-100/80 text-green-700">
                  {job.match}% match
                </Badge>
                <Sparkles className="w-4 h-4 text-yellow-500" />
              </div>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 shadow-md"
              >
                Apply
              </Button>
            </div>
          </div>
        ))}
        <div className="text-center pt-4">
          <Link href="ai-job-match">
            <Button
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
            >
              <Brain className="w-4 h-4 mr-2" />
              View All AI Matches
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiJobMatch;
