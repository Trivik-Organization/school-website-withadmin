"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  User,
  Mail,
  Trash2,
  MailOpen,
  MailWarning,
  Loader2,
  Clock,
  X,
  BarChart2,
  Eye,
  Cloud,
  ArrowUp,
  MessageSquare,
} from "lucide-react";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  
  // State for the modal
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchInquiries = () => {
    fetch(`/api/inquiries?page=${page}&limit=5`)
      .then((res) => res.json())
      .then((data) => {
        setInquiries(data.data || []);
        if (data.pagination) {
          setTotalPages(data.pagination.totalPages);
          setTotalItems(data.pagination.total);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInquiries();
  }, [page]);

  const toggleReadStatus = async (id: number, currentRead: boolean) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead: !currentRead }),
      });
      if (res.status === 200) {
        // Update local state for immediate feedback
        setInquiries(inquiries.map(i => i.id === id ? { ...i, isRead: !currentRead } : i));
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, isRead: !currentRead });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteInquiry = async (id: number) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;

    try {
      const res = await fetch(`/api/inquiries?id=${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        setInquiries(inquiries.filter(i => i.id !== id));
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    if (filter === "unread") return !inquiry.isRead;
    if (filter === "read") return inquiry.isRead;
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Inquiry Inbox</h1>
        </div>

        {/* Tab Filters */}
        <div className="inline-flex items-center rounded-lg border border-gray-200 bg-white p-1 shadow-xs">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer transition-colors ${
              filter === "all" ? "bg-[#ffcc00] text-black" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            All ({inquiries.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer transition-colors ${
              filter === "unread" ? "bg-[#ffcc00] text-black" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Unread ({inquiries.filter(i => !i.isRead).length})
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer transition-colors ${
              filter === "read" ? "bg-[#ffcc00] text-black" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Read ({inquiries.filter(i => i.isRead).length})
          </button>
        </div>
      </div>

      {/* Inquiries Table Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col min-h-100">
        <div className="w-full overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#f4f7fb] text-gray-500 text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 w-62.5">Sender & Subject</th>
                <th className="px-6 py-3">Message Snippet</th>
                <th className="px-6 py-3 w-40">Date Received</th>
                <th className="px-6 py-3 w-30 text-center">Status</th>
                <th className="px-6 py-3 w-25 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-gray-500">
                    <Loader2 className="h-8 w-8 animate-spin text-orange-500 mx-auto mb-3" />
                    <p className="text-sm font-medium">Loading inbox...</p>
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-gray-500">
                    <Inbox className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm font-medium">No messages found matching your filter.</p>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <tr 
                    key={inquiry.id} 
                    className={`hover:bg-gray-50/50 transition-colors cursor-pointer ${!inquiry.isRead ? 'bg-orange-50/20' : 'bg-white'}`}
                    onClick={() => {
                      setSelectedInquiry(inquiry);
                      if (!inquiry.isRead) {
                        toggleReadStatus(inquiry.id, inquiry.isRead);
                      }
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${!inquiry.isRead ? 'bg-orange-100 text-orange-600' : 'bg-blue-50 text-blue-500'}`}>
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-sm leading-tight ${!inquiry.isRead ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
                            {inquiry.name}
                          </span>
                          <span className="text-xs text-gray-500 truncate max-w-45">{inquiry.subject}</span>
                        </div>
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-xs truncate max-w-62.5 ${!inquiry.isRead ? 'font-medium text-gray-700' : 'text-gray-500'}`}>
                      {inquiry.message}
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs font-medium">
                      {inquiry.createdAt.split(" ")[0]}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        inquiry.isRead ? 'bg-gray-100 text-gray-500 border border-gray-200' : 'bg-orange-100 text-orange-700 border border-orange-200'
                      }`}>
                        {inquiry.isRead ? 'Read' : 'New'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => toggleReadStatus(inquiry.id, inquiry.isRead)}
                          className="text-gray-400 hover:text-gray-800 transition-colors cursor-pointer"
                          title={inquiry.isRead ? "Mark as unread" : "Mark as read"}
                        >
                          {inquiry.isRead ? <MailWarning className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => deleteInquiry(inquiry.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete Message"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        {/* Pagination Footer */}
        {totalItems > 5 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white mt-auto">
            <span className="text-xs font-bold text-gray-500">
              Showing {filteredInquiries.length} of {totalItems} entries
            </span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-2.5 py-1 text-xs font-semibold text-gray-400 border border-gray-100 rounded hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPage(idx + 1)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer ${
                    page === idx + 1
                      ? "text-white bg-black"
                      : "text-gray-600 border border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-2.5 py-1 text-xs font-semibold text-gray-600 border border-gray-100 rounded hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setSelectedInquiry(null)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-150 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
              <div className="pr-4">
                <h2 className="text-xl font-bold text-gray-900 leading-tight">
                  {selectedInquiry.subject}
                </h2>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5 font-medium text-gray-800">
                    <User className="h-4 w-4 text-gray-400" />
                    {selectedInquiry.name}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <a href={`mailto:${selectedInquiry.email}`} className="text-orange-600 hover:underline">
                      {selectedInquiry.email}
                    </a>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100 shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <Clock className="h-3.5 w-3.5" />
                Received on {selectedInquiry.createdAt}
              </div>
              
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-white rounded-lg">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/30 flex items-center justify-between">
              <button
                onClick={() => {
                  deleteInquiry(selectedInquiry.id);
                  setSelectedInquiry(null);
                }}
                className="flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
                Delete Message
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    toggleReadStatus(selectedInquiry.id, selectedInquiry.isRead);
                  }}
                  className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  {selectedInquiry.isRead ? (
                    <>
                      <MailWarning className="h-4 w-4 text-gray-400" />
                      Mark Unread
                    </>
                  ) : (
                    <>
                      <MailOpen className="h-4 w-4 text-gray-400" />
                      Mark Read
                    </>
                  )}
                </button>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="text-sm font-semibold text-white bg-[#111827] hover:bg-gray-800 px-5 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
