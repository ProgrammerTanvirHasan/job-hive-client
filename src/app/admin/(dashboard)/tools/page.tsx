export default function AIToolsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">AI Tools</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {["Resume Analyzer", "Job Matcher", "Description Optimizer"].map(
          (tool) => (
            <div key={tool} className="p-5 bg-white rounded-xl shadow">
              <h2 className="font-semibold">{tool}</h2>
              <p className="text-sm text-gray-500 mt-1">AI powered feature</p>
              <button className="mt-3 px-3 py-1 bg-black text-white rounded">
                Open
              </button>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
