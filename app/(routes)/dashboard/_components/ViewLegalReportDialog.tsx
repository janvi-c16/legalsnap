"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SessionDetails } from "./HistoryList";
import moment from "moment";
import axios from "axios";

type Props = {
  record: SessionDetails;
};

type LegalReport = {
  sessionId: string;
  agent: string;
  user: string;
  timestamp: string;
  legalIssue: string;
  summary: string;
  caseType: string;
  jurisdiction: string;
  urgency: "Low" | "Medium" | "High";
  lawsDiscussed: string[];
  documentsMentioned: string[];
  recommendations: string[];
};

function ViewLegalReportDialog({ record }: Props) {
  const [open, setOpen] = useState(false);
  const [report, setReport] = useState<LegalReport | null>(
    //@ts-ignore
    record.report || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/legal-report", {
        sessionId: record.sessionId,
        sessionDetail: record,
        //@ts-ignore
        messages: record.conversation || [],
      });

      if (res.data && res.data.error) {
        // Still set the report data even if there's an error
        // This allows us to display the fallback report
        setReport(res.data);
        setError(typeof res.data.error === 'string' ? res.data.error : 'Failed to generate report');
      } else {
        setReport(res.data);
        setError(null);
      }
    } catch (err) {
      console.error("Failed to fetch report", err);
      setError("Failed to generate the legal report. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (open && !report) {
      fetchReport();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          View Legal Report
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-4xl md:px-10 px-4 py-8 bg-white shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className="text-center text-2xl font-bold text-indigo-700">
              AI Lawyer Report
            </h2>
          </DialogTitle>
          <DialogDescription asChild>
            {loading ? (
              <p className="text-center mt-10 text-gray-500">
                Generating report...
              </p>
            ) : !report ? (
              <p className="text-center text-red-500 mt-10">
                No report available
              </p>
            ) : (
              <>
                {error && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                    <p className="text-yellow-700">
                      <strong>Note:</strong> {error}
                    </p>
                    <p className="text-yellow-700 text-sm">
                      Showing available information below.
                    </p>
                  </div>
                )}
                {report.fallbackUsed && !error && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                    <p className="text-blue-700">
                      <strong>Note:</strong> This is a general report as we couldn't generate a specific one based on your conversation.
                    </p>
                  </div>
                )}
              <div className="max-h-[75vh] overflow-y-auto space-y-6 text-gray-800 text-sm px-2">
                {/* Session Info */}
                <section className="border-b pb-3">
                  <h3 className="text-lg font-semibold text-indigo-600 mb-1">
                    Session Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <span className="font-bold">Lawyer:</span>{" "}
                      {record.selectedLawyer?.specialist || "General Lawyer"}
                    </div>
                    <div>
                      <span className="font-bold">Client:</span>{" "}
                      {report.user || "Anonymous"}
                    </div>
                    <div>
                      <span className="font-bold">Consulted On:</span>{" "}
                      {moment(new Date(record.createdAt)).format(
                        "MMMM Do YYYY, h:mm A"
                      )}
                    </div>
                    <div>
                      <span className="font-bold">Agent:</span> {report.agent || "N/A"}
                    </div>
                  </div>
                </section>

                {/* Legal Issue */}
                <section>
                  <h3 className="text-indigo-600 font-semibold">Legal Issue</h3>
                  <p className="italic">{report.legalIssue || "Not specified"}</p>
                </section>

                {/* Summary */}
                <section>
                  <h3 className="text-indigo-600 font-semibold">
                    Case Summary
                  </h3>
                  <p>{report.summary || "No summary available"}</p>
                </section>

                {/* Case Type and Jurisdiction */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-indigo-600 font-semibold">Case Type</h3>
                    <p>{report.caseType || "Not specified"}</p>
                  </div>
                  <div>
                    <h3 className="text-indigo-600 font-semibent">
                      Jurisdiction
                    </h3>
                    <p>{report.jurisdiction || "Not specified"}</p>
                  </div>
                </section>

                {/* Urgency */}
                <section>
                  <h3 className="text-indigo-600 font-semibold">Urgency</h3>
                  <p>{report.urgency || "Not specified"}</p>
                </section>

                {/* Laws Discussed */}
                <section>
                  <h3 className="text-indigo-600 font-semibold">
                    Laws Discussed
                  </h3>
                  <ul className="list-disc list-inside">
                    {report.lawsDiscussed && report.lawsDiscussed.length > 0 ? (
                      report.lawsDiscussed.map((law, i) => (
                        <li key={i}>{law}</li>
                      ))
                    ) : (
                      <li>None</li>
                    )}
                  </ul>
                </section>

                {/* Documents Mentioned */}
                <section>
                  <h3 className="text-indigo-600 font-semibold">
                    Documents Mentioned
                  </h3>
                  <ul className="list-disc list-inside">
                    {report.documentsMentioned && report.documentsMentioned.length > 0 ? (
                      report.documentsMentioned.map((doc, i) => (
                        <li key={i}>{doc}</li>
                      ))
                    ) : (
                      <li>None</li>
                    )}
                  </ul>
                </section>

                {/* Recommendations */}
                <section>
                  <h3 className="text-indigo-600 font-semibold">
                    Recommendations
                  </h3>
                  <ul className="list-disc list-inside">
                    {report.recommendations && report.recommendations.length > 0 ? (
                      report.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))
                    ) : (
                      <li>None</li>
                    )}
                  </ul>
                </section>
              </div>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ViewLegalReportDialog;