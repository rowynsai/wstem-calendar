(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/TaskModal.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TaskModal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function TaskModal({ isOpen, onClose, onSave, onDelete, existingTask }) {
    _s();
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [date, setDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [startTime, setStartTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [endTime, setEndTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [subject, setSubject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const subjectOptions = [
        "Math",
        "CPSC",
        "Chem",
        "Biol",
        "Phys",
        "APSC"
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TaskModal.useEffect": ()=>{
            if (existingTask) {
                setTitle(existingTask.summary || existingTask.title || "");
                setDescription(existingTask.description || "");
                setSubject(existingTask.extendedProperties?.private?.subject || "");
                const startDateTime = existingTask.start?.dateTime || existingTask.start?.date;
                const endDateTime = existingTask.end?.dateTime || existingTask.end?.date;
                if (startDateTime) {
                    const [startDate, startTimeValue] = startDateTime.split("T");
                    setDate(startDate);
                    setStartTime(startTimeValue ? startTimeValue.slice(0, 5) : "");
                }
                if (endDateTime) {
                    const [, endTimeValue] = endDateTime.split("T");
                    setEndTime(endTimeValue ? endTimeValue.slice(0, 5) : "");
                }
            } else {
                setTitle("");
                setDescription("");
                setSubject("");
                setDate("");
                setStartTime("");
                setEndTime("");
            }
        }
    }["TaskModal.useEffect"], [
        existingTask,
        isOpen
    ]);
    const handleSubmit = ()=>{
        if (!title || !date || !startTime || !endTime) {
            alert("Please fill in all required fields.");
            return;
        }
        const updatedTask = {
            title,
            description,
            date,
            startTime,
            endTime,
            subject
        };
        onSave(updatedTask);
        onClose();
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-[#fdf6e3] bg-opacity-50 flex justify-center items-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold mb-4",
                    children: existingTask ? "View Event Details" : "Add Event"
                }, void 0, false, {
                    fileName: "[project]/components/TaskModal.js",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    placeholder: "Title",
                    className: "w-full border p-2 rounded mb-2",
                    value: title,
                    onChange: (e)=>setTitle(e.target.value),
                    readOnly: !!existingTask
                }, void 0, false, {
                    fileName: "[project]/components/TaskModal.js",
                    lineNumber: 77,
                    columnNumber: 9
                }, this),
                !existingTask ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    className: "w-full border p-2 rounded mb-2",
                    value: subject,
                    onChange: (e)=>setSubject(e.target.value),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "",
                            children: "Select Subject"
                        }, void 0, false, {
                            fileName: "[project]/components/TaskModal.js",
                            lineNumber: 91,
                            columnNumber: 5
                        }, this),
                        subjectOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: option,
                                children: option
                            }, option, false, {
                                fileName: "[project]/components/TaskModal.js",
                                lineNumber: 93,
                                columnNumber: 7
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/TaskModal.js",
                    lineNumber: 86,
                    columnNumber: 3
                }, this) : subject && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm text-gray-600 italic",
                    children: subject
                }, void 0, false, {
                    fileName: "[project]/components/TaskModal.js",
                    lineNumber: 99,
                    columnNumber: 14
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    placeholder: "Description",
                    className: "w-full border p-2 rounded mb-2",
                    value: description,
                    onChange: (e)=>setDescription(e.target.value),
                    readOnly: !!existingTask
                }, void 0, false, {
                    fileName: "[project]/components/TaskModal.js",
                    lineNumber: 103,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "date",
                    className: "w-full border p-2 rounded mb-2",
                    value: date,
                    onChange: (e)=>setDate(e.target.value),
                    readOnly: !!existingTask
                }, void 0, false, {
                    fileName: "[project]/components/TaskModal.js",
                    lineNumber: 111,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "time",
                    className: "w-full border p-2 rounded mb-2",
                    value: startTime,
                    onChange: (e)=>setStartTime(e.target.value),
                    readOnly: !!existingTask
                }, void 0, false, {
                    fileName: "[project]/components/TaskModal.js",
                    lineNumber: 119,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "time",
                    className: "w-full border p-2 rounded mb-4",
                    value: endTime,
                    onChange: (e)=>setEndTime(e.target.value),
                    readOnly: !!existingTask
                }, void 0, false, {
                    fileName: "[project]/components/TaskModal.js",
                    lineNumber: 127,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400",
                            onClick: onClose,
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/components/TaskModal.js",
                            lineNumber: 136,
                            columnNumber: 11
                        }, this),
                        !existingTask && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700",
                            onClick: handleSubmit,
                            children: "Save"
                        }, void 0, false, {
                            fileName: "[project]/components/TaskModal.js",
                            lineNumber: 144,
                            columnNumber: 13
                        }, this),
                        existingTask && onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700",
                            onClick: ()=>{
                                onDelete(existingTask);
                                onClose();
                            },
                            children: "Delete"
                        }, void 0, false, {
                            fileName: "[project]/components/TaskModal.js",
                            lineNumber: 153,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/TaskModal.js",
                    lineNumber: 135,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/TaskModal.js",
            lineNumber: 72,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/TaskModal.js",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_s(TaskModal, "NiaaMuhzcKoRUPcD2XZ8RWsfqvg=");
_c = TaskModal;
var _c;
__turbopack_context__.k.register(_c, "TaskModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/calendar/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CalendarPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$big$2d$calendar$2f$dist$2f$react$2d$big$2d$calendar$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-big-calendar/dist/react-big-calendar.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/parse.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/startOfWeek.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$getDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/getDay.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TaskModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/TaskModal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
const locales = {
    "en-US": __turbopack_context__.r("[project]/node_modules/date-fns/locale/en-US.cjs [app-client] (ecmascript)")
};
const localizer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$big$2d$calendar$2f$dist$2f$react$2d$big$2d$calendar$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dateFnsLocalizer"])({
    format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"],
    parse: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"],
    startOfWeek: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    getDay: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$getDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    locales
});
// subject colours
const subjectColors = {
    Math: "#f87171",
    CPSC: "#60a5fa",
    Chem: "#ffa500",
    Biol: "#34d399",
    Phys: "#fbbf24",
    APSC: "#a78bfa"
};
function formatDateTime(isoDate) {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    // dd/mm/yyyy
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    // time formatted as hh:mm, 24 hr clock
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}
// read-only modal for event details (no edits)
function EventDetailsModal({ event, onClose }) {
    if (!event) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: onClose,
        style: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onClick: (e)=>e.stopPropagation(),
            style: {
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                minWidth: "300px"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    children: event.title || "No Title"
                }, void 0, false, {
                    fileName: "[project]/app/calendar/page.js",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: "Description:"
                        }, void 0, false, {
                            fileName: "[project]/app/calendar/page.js",
                            lineNumber: 73,
                            columnNumber: 12
                        }, this),
                        " ",
                        event.description || "No description available"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/calendar/page.js",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: "Start:"
                        }, void 0, false, {
                            fileName: "[project]/app/calendar/page.js",
                            lineNumber: 74,
                            columnNumber: 12
                        }, this),
                        " ",
                        formatDateTime(event.start)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/calendar/page.js",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: "End:"
                        }, void 0, false, {
                            fileName: "[project]/app/calendar/page.js",
                            lineNumber: 75,
                            columnNumber: 12
                        }, this),
                        " ",
                        formatDateTime(event.end)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/calendar/page.js",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: "auto",
                        display: "flex",
                        justifyContent: "flex-end"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/app/calendar/page.js",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/calendar/page.js",
                    lineNumber: 76,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/calendar/page.js",
            lineNumber: 68,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/calendar/page.js",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_c = EventDetailsModal;
//dropdown subject choices
function SubjectDropdown({ selectedSubjects, setSelectedSubjects, user }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const options = Object.keys(subjectColors);
    const toggleSubject = (subject)=>{
        setSelectedSubjects((prev)=>{
            let updated;
            if (subject === 'Select All') {
                updated = prev.length === options.length ? [] : options;
            } else {
                updated = prev.includes(subject) ? prev.filter((s)=>s !== subject) : [
                    ...prev,
                    subject
                ];
            }
            // if user get their saved pref and update them
            if (user) {
                fetch(`http://localhost:5000/api/preferences`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: user._id,
                        preferences: {
                            subjects: updated
                        }
                    })
                }).catch((err)=>console.error("Failed to save preferences", err));
            }
            return updated;
        });
    };
    const isChecked = (subject)=>subject === 'Select All' ? selectedSubjects.length === options.length : selectedSubjects.includes(subject);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative inline-block text-left z-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setOpen((prev)=>!prev),
                    className: "inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-white hover:bg-blue-900 focus:outline-none",
                    style: {
                        backgroundColor: '#3174ad'
                    },
                    children: "Subjects"
                }, void 0, false, {
                    fileName: "[project]/app/calendar/page.js",
                    lineNumber: 124,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/calendar/page.js",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "flex items-center px-4 py-2 text-sm text-gray-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    className: "mr-2",
                                    checked: isChecked('Select All'),
                                    onChange: ()=>toggleSubject('Select All')
                                }, void 0, false, {
                                    fileName: "[project]/app/calendar/page.js",
                                    lineNumber: 137,
                                    columnNumber: 15
                                }, this),
                                "Select All"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/calendar/page.js",
                            lineNumber: 136,
                            columnNumber: 13
                        }, this),
                        options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center px-4 py-2 text-sm text-gray-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        className: "mr-2",
                                        checked: isChecked(option),
                                        onChange: ()=>toggleSubject(option)
                                    }, void 0, false, {
                                        fileName: "[project]/app/calendar/page.js",
                                        lineNumber: 150,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-block w-3 h-3 rounded-full mr-2",
                                        style: {
                                            backgroundColor: subjectColors[option]
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/calendar/page.js",
                                        lineNumber: 156,
                                        columnNumber: 17
                                    }, this),
                                    option
                                ]
                            }, option, true, {
                                fileName: "[project]/app/calendar/page.js",
                                lineNumber: 146,
                                columnNumber: 15
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/calendar/page.js",
                    lineNumber: 135,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/calendar/page.js",
                lineNumber: 134,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/calendar/page.js",
        lineNumber: 122,
        columnNumber: 5
    }, this);
}
_s(SubjectDropdown, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c1 = SubjectDropdown;
function CalendarPage() {
    _s1();
    const [selectedEvent, setSelectedEvent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isTaskModalOpen, setIsTaskModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // for Add Event (admin only)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // for read-only event details
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedSubjects, setSelectedSubjects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        "Math",
        "CPSC",
        "Chem",
        "Biol",
        "Phys",
        "APSC"
    ]);
    const profileLink = user ? "/profile" : "/register";
    // helps w null (no subject) case
    const filteredEvents = events.filter((event)=>selectedSubjects.length === 0 || // show all if none selected
        !event.subject || // events without subject always shown
        selectedSubjects.includes(event.subject));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CalendarPage.useEffect": ()=>{
            const fetchUserAndEvents = {
                "CalendarPage.useEffect.fetchUserAndEvents": async ()=>{
                    const storedUser = localStorage.getItem("user");
                    let userPrefs = null;
                    if (storedUser && storedUser !== "undefined") {
                        try {
                            const parsedUser = JSON.parse(storedUser);
                            setUser(parsedUser);
                            if (parsedUser.preferences?.subjects) {
                                setSelectedSubjects(parsedUser.preferences.subjects);
                                userPrefs = parsedUser.preferences.subjects;
                            }
                        } catch (err) {
                            console.error("Error parsing user from localStorage:", err);
                            localStorage.removeItem("user");
                        }
                    }
                    try {
                        const response = await fetch("http://localhost:5000/api/calendar");
                        const data = await response.json();
                        if (Array.isArray(data.events)) {
                            const formattedEvents = data.events.map({
                                "CalendarPage.useEffect.fetchUserAndEvents.formattedEvents": (event)=>({
                                        id: event.id,
                                        title: event.summary || event.title || "No Title",
                                        start: new Date(event.start?.dateTime || event.start?.date || new Date()),
                                        end: new Date(event.end?.dateTime || event.end?.date || new Date()),
                                        description: event.description || "",
                                        subject: event.extendedProperties?.private?.subject || null
                                    })
                            }["CalendarPage.useEffect.fetchUserAndEvents.formattedEvents"]);
                            setEvents(formattedEvents);
                        } else {
                            setEvents([]);
                        }
                    } catch (err) {
                        console.error("Failed to fetch events:", err);
                        setEvents([]);
                    }
                }
            }["CalendarPage.useEffect.fetchUserAndEvents"];
            fetchUserAndEvents();
        }
    }["CalendarPage.useEffect"], []);
    const handleSaveTask = async (task)=>{
        console.log("handleSaveTask triggered", task);
        try {
            const postData = {
                title: task.summary || task.title || "No Title",
                description: task.description || "",
                date: task.date,
                startTime: task.startTime,
                endTime: task.endTime,
                subject: task.subject || null,
                user: user?.id || null
            };
            const response = await fetch("http://localhost:5000/api/calendar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData)
            });
            const data = await response.json();
            if (data.newEvent) {
                const newEvent = {
                    id: data.newEvent.id,
                    title: data.newEvent.summary || data.newEvent.title || "No Title",
                    start: new Date(data.newEvent.start?.dateTime || data.newEvent.start?.date || new Date()),
                    end: new Date(data.newEvent.end?.dateTime || data.newEvent.end?.date || new Date()),
                    description: data.newEvent.description || "",
                    subject: data.newEvent.extendedProperties?.private?.subject || null
                };
                setEvents((prev)=>[
                        ...prev,
                        newEvent
                    ]);
            }
            //get emails from inbox
            await fetch('/api/email/scan', {
                method: 'POST'
            });
        } catch (err) {
            console.error("Failed to save task:", err);
        }
    };
    // Clicking on event shows read-only details modal
    const handleSelectEvent = (event)=>{
        setSelectedEvent(event);
        setIsDetailsModalOpen(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative min-h-screen bg-[#fdf6e3] text-black font-[family-name:var(--font-geist-sans)] px-6 pt-6 pb-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: "absolute left-0 top-0 cursor-pointer",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: "/wstemlogo.png",
                    alt: "Home",
                    width: 175,
                    height: 100,
                    className: "object-contain"
                }, void 0, false, {
                    fileName: "[project]/app/calendar/page.js",
                    lineNumber: 283,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/calendar/page.js",
                lineNumber: 282,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "p-6 sm:p-12 max-w-4xl mx-auto mt-20 bg-white/70 rounded-2xl shadow-xl backdrop-blur-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-4 relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: profileLink,
                                className: "absolute left-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/profile.svg",
                                    alt: "profile icon",
                                    className: "w-10 h-10"
                                }, void 0, false, {
                                    fileName: "[project]/app/calendar/page.js",
                                    lineNumber: 295,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/calendar/page.js",
                                lineNumber: 294,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold text-center w-full",
                                children: "Women in STEM Events"
                            }, void 0, false, {
                                fileName: "[project]/app/calendar/page.js",
                                lineNumber: 298,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute right-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubjectDropdown, {
                                    selectedSubjects: selectedSubjects,
                                    setSelectedSubjects: setSelectedSubjects,
                                    user: user
                                }, void 0, false, {
                                    fileName: "[project]/app/calendar/page.js",
                                    lineNumber: 301,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/calendar/page.js",
                                lineNumber: 300,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/calendar/page.js",
                        lineNumber: 293,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-gray-300 rounded overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$big$2d$calendar$2f$dist$2f$react$2d$big$2d$calendar$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Calendar"], {
                            localizer: localizer,
                            events: filteredEvents,
                            startAccessor: "start",
                            endAccessor: "end",
                            style: {
                                height: 600
                            },
                            views: [
                                "month",
                                "week",
                                "day"
                            ],
                            defaultView: "month",
                            onSelectEvent: handleSelectEvent,
                            eventPropGetter: (event)=>{
                                let bgColor = "#3174ad"; // default blue
                                switch(event.subject){
                                    case "Math":
                                        bgColor = "#f87171"; // red
                                        break;
                                    case "CPSC":
                                        bgColor = "#60a5fa"; // blue
                                        break;
                                    case "Chem":
                                        bgColor = "#ffa500"; // orange
                                        break;
                                    case "Biol":
                                        bgColor = "#34d399"; // green
                                        break;
                                    case "Phys":
                                        bgColor = "#fbbf24"; // yellow
                                        break;
                                    case "APSC":
                                        bgColor = "#a78bfa"; // purple
                                        break;
                                }
                                return {
                                    style: {
                                        backgroundColor: bgColor,
                                        borderRadius: "6px",
                                        color: "white",
                                        border: "none",
                                        padding: "4px 8px"
                                    }
                                };
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/calendar/page.js",
                            lineNumber: 310,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/calendar/page.js",
                        lineNumber: 309,
                        columnNumber: 9
                    }, this),
                    user?.isAdmin === true && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "rounded-full bg-sky-400 text-white py-2 px-4 hover:bg-blue-700",
                            onClick: ()=>setIsTaskModalOpen(true),
                            children: "Add Event"
                        }, void 0, false, {
                            fileName: "[project]/app/calendar/page.js",
                            lineNumber: 358,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/calendar/page.js",
                        lineNumber: 357,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/calendar/page.js",
                lineNumber: 292,
                columnNumber: 7
            }, this),
            isDetailsModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EventDetailsModal, {
                event: selectedEvent,
                onClose: ()=>{
                    setIsDetailsModalOpen(false);
                    setSelectedEvent(null);
                }
            }, void 0, false, {
                fileName: "[project]/app/calendar/page.js",
                lineNumber: 369,
                columnNumber: 9
            }, this),
            isTaskModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TaskModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isTaskModalOpen,
                onClose: ()=>setIsTaskModalOpen(false),
                onSave: handleSaveTask,
                existingTask: selectedEvent
            }, void 0, false, {
                fileName: "[project]/app/calendar/page.js",
                lineNumber: 379,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "mt-12 flex justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    className: "absolute top-10 right-7 nter gap-2 hover:underline hover:underline-offset-4 text-md",
                    href: "https://qualtricsxmrt5r3gxmc.qualtrics.com/jfe/form/SV_6Vwj1rfNTJLSXA2",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: "Suggest an event / newsletter !"
                }, void 0, false, {
                    fileName: "[project]/app/calendar/page.js",
                    lineNumber: 388,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/calendar/page.js",
                lineNumber: 387,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "mt-12 flex justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: "flex items-center gap-2 hover:underline hover:underline-offset-4 text-sm px-6",
                        href: "/about",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/file.svg",
                                alt: "Globe icon",
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/app/calendar/page.js",
                                lineNumber: 405,
                                columnNumber: 11
                            }, this),
                            "About us"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/calendar/page.js",
                        lineNumber: 399,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: "flex center nter gap-2 hover:underline hover:underline-offset-4 text-sm",
                        href: "mailto:rowynsai+calendar@gmail.com?subject=UBC Women in STEM Calendar",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/globe.svg",
                                alt: "Globe icon",
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/app/calendar/page.js",
                                lineNumber: 415,
                                columnNumber: 11
                            }, this),
                            "Contact us !"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/calendar/page.js",
                        lineNumber: 409,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/calendar/page.js",
                lineNumber: 398,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/calendar/page.js",
        lineNumber: 281,
        columnNumber: 5
    }, this);
}
_s1(CalendarPage, "HEWSDddopR8/douqv/Z2sKZEP78=");
_c2 = CalendarPage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "EventDetailsModal");
__turbopack_context__.k.register(_c1, "SubjectDropdown");
__turbopack_context__.k.register(_c2, "CalendarPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_074e8008._.js.map