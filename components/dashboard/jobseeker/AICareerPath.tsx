'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Sparkles } from 'lucide-react';
import React from 'react';

const AICareerPath = () => {
    return (
        <div className='mt-5'>
           <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      AI Career Path
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-3">
                      {[
                        { role: "Senior Developer", timeline: "Current", status: "achieved" },
                        { role: "Tech Lead", timeline: "6-12 months", status: "next" },
                        { role: "Engineering Manager", timeline: "2-3 years", status: "future" },
                        { role: "Director of Engineering", timeline: "5+ years", status: "future" },
                      ].map((step, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              step.status === "achieved"
                                ? "bg-green-500"
                                : step.status === "next"
                                  ? "bg-blue-500"
                                  : "bg-gray-300"
                            }`}
                          ></div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-blue-900">{step.role}</div>
                            <div className="text-xs text-blue-600">{step.timeline}</div>
                          </div>
                          {step.status === "next" && (
                            <Badge className="bg-blue-100 text-blue-700 text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Focus
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-4 border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Get AI Career Plan
                    </Button>
                  </CardContent>
                </Card>
        </div>
    );
};

export default AICareerPath;