export default function SubjectDropdown({ selectedSubjects, setSelectedSubjects }) {
    const [open, setOpen] = useState(false);
    const options = ["Math", "CPSC", "Chem", "Phys", "Eng"];
  
    const toggleSubject = (subject) => {
      if (subject === "Select All") {
        if (selectedSubjects.length === options.length) {
          setSelectedSubjects([]);
        } else {
          setSelectedSubjects(options);
        }
      } else {
        setSelectedSubjects((prev) =>
          prev.includes(subject)
            ? prev.filter((s) => s !== subject)
            : [...prev, subject]
        );
      }
    };
  
    const isChecked = (subject) =>
      subject === "Select All"
        ? selectedSubjects.length === options.length
        : selectedSubjects.includes(subject);
  
    return (
      <div className="relative inline-block text-left z-50">
        <div>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
          >
            Subjects
          </button>
        </div>
  
        {open && (
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <label className="flex items-center px-4 py-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={isChecked("Select All")}
                  onChange={() => toggleSubject("Select All")}
                />
                Select All
              </label>
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center px-4 py-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={isChecked(option)}
                    onChange={() => toggleSubject(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  