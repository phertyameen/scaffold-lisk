import { useState } from "react";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export default function GuestbookUI() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Read: Get all guestbook entries
  const { data: entries } = useScaffoldContractRead({
    contractName: "Guestbook",
    functionName: "getAllEntries",
  });

  // Write: Sign the guestbook
  const { writeAsync: signGuestbook, isLoading } = useScaffoldContractWrite({
    contractName: "Guestbook",
    functionName: "signGuestbook",
    args: [name, message],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return alert("Please fill all fields");
    try {
      await signGuestbook();
      setName("");
      setMessage("");
    } catch (error) {
      console.error("Error signing guestbook:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">📜 Blockchain Guestbook</h1>
      <h4>Add your name to the guestbook to get access *_*</h4>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border border-gray-300 rounded px-4 py-2 w-full"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="border border-gray-300 rounded px-4 py-2 w-full"
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Submitting..." : "Sign Guestbook"}
        </button>
      </form>

      {/* Entries List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Entries</h2>
        {entries && entries.length > 0 ? (
          entries.map((entry: any, index: number) => (
            <div key={index} className="border p-3 rounded shadow-sm">
              <p className="font-bold">{entry.name} <span className="text-sm text-gray-500">({entry.signer})</span></p>
              <p>{entry.message}</p>
              <p className="text-xs text-gray-400">
                {new Date(Number(entry.timestamp) * 1000).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No entries yet.</p>
        )}
      </div>
    </div>
  );
}