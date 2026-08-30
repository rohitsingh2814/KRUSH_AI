import { useState } from "react";
import {
    LayoutDashboard,
    Sparkles,
    Heart,
    History,
    User,
    Settings,
    LogOut,
    Upload,
    Search,
    Bell,
    ChevronDown,
    ArrowRight,
    Camera,
    Briefcase,
    PartyPopper,
    HeartHandshake,
    Shirt,
    Star,
    Palette,
    X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Dashboard() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const [selectedEvent, setSelectedEvent] = useState("casual");
    const [selectedFile, setSelectedFile] = useState(null);

    const events = [
        {
            id: "casual",
            name: "Casual",
            icon: Shirt,
            description: "Everyday style"
        },
        {
            id: "party",
            name: "Party",
            icon: PartyPopper,
            description: "Stand out"
        },
        {
            id: "wedding",
            name: "Wedding",
            icon: HeartHandshake,
            description: "Elegant looks"
        },
        {
            id: "work",
            name: "Work",
            icon: Briefcase,
            description: "Professional"
        }
    ];

    const outfits = [
        {
            name: "Modern Casual",
            category: "Casual",
            colors: ["#111827", "#F5F5F4", "#78716C"],
            rating: 4.8,
            image:
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"
        },
        {
            name: "Smart Weekend",
            category: "Smart Casual",
            colors: ["#1E3A5F", "#E7E5E4", "#44403C"],
            rating: 4.7,
            image:
                "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=600&q=80"
        },
        {
            name: "Minimal Classic",
            category: "Classic",
            colors: ["#292524", "#D6D3D1", "#A8A29E"],
            rating: 4.9,
            image:
                "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80"
        }
    ];

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be smaller than 5MB.");
            return;
        }

        setSelectedFile(file);
        toast.success("Photo selected!");
    };

    const handleAnalysis = () => {
        if (!selectedFile) {
            toast.error("Please upload a photo first.");
            return;
        }

        toast.success("AI analysis will start here.");

        // Later:
        // POST /api/analysis/analyze
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success("Logged out successfully");

        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#faf9f7] text-gray-900">

            {/* Sidebar */}

            <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-gray-200 bg-white lg:block">

                <div className="flex h-full flex-col">

                    {/* Logo */}

                    <div className="flex h-20 items-center px-7">

                        <Sparkles className="mr-2 h-7 w-7 text-[#D4AF37]" />

                        <span className="text-2xl font-bold">
                            Krush
                            <span className="text-rose-500">
                                AI
                            </span>
                        </span>

                    </div>

                    {/* Navigation */}

                    <nav className="flex-1 space-y-2 px-4">

                        <NavItem
                            icon={LayoutDashboard}
                            label="Dashboard"
                            active
                        />

                        <NavItem
                            icon={Sparkles}
                            label="AI Style Analysis"
                            onClick={() =>
                                toast("AI analysis coming next")
                            }
                        />

                        <NavItem
                            icon={Heart}
                            label="Saved Looks"
                        />

                        <NavItem
                            icon={History}
                            label="Analysis History"
                        />

                        <NavItem
                            icon={User}
                            label="Profile"
                        />

                    </nav>

                    {/* Bottom */}

                    <div className="border-t border-gray-100 p-4">

                        <NavItem
                            icon={Settings}
                            label="Settings"
                        />

                        <button
                            onClick={handleLogout}
                            className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-500 transition hover:bg-red-50 hover:text-red-500"
                        >
                            <LogOut size={19} />
                            Logout
                        </button>

                    </div>

                </div>

            </aside>

            {/* Main */}

            <main className="lg:ml-64">

                {/* Header */}

                <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white/90 px-6 backdrop-blur lg:px-10">

                    <div>

                        <p className="text-sm text-gray-400">
                            Your personal style space
                        </p>

                        <h1 className="text-xl font-bold">
                            Dashboard
                        </h1>

                    </div>

                    <div className="flex items-center gap-4">

                        <div className="hidden items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 md:flex">

                            <Search
                                size={18}
                                className="text-gray-400"
                            />

                            <input
                                className="ml-2 w-40 bg-transparent text-sm outline-none"
                                placeholder="Search..."
                            />

                        </div>

                        <button className="relative rounded-xl p-2.5 hover:bg-gray-100">

                            <Bell size={20} />

                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />

                        </button>

                        <div className="flex items-center gap-3">

                            {user.profileImage ? (
                                <img
                                    src={user.profileImage}
                                    alt={user.name}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 font-semibold text-rose-500">
                                    {user.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "U"}
                                </div>
                            )}

                            <div className="hidden sm:block">

                                <p className="text-sm font-semibold">
                                    {user.name || "User"}
                                </p>

                                <p className="text-xs text-gray-400">
                                    Fashion Explorer
                                </p>

                            </div>

                            <ChevronDown
                                size={16}
                                className="hidden sm:block text-gray-400"
                            />

                        </div>

                    </div>

                </header>

                {/* Content */}

                <div className="p-6 lg:p-10">

                    {/* Welcome */}

                    <section className="mb-8">

                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-rose-500">
                            Welcome back
                        </p>

                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Discover your
                            <span className="text-rose-500">
                                {" "}perfect style.
                            </span>
                        </h2>

                        <p className="mt-3 max-w-2xl text-gray-500">
                            Upload your photo and let Krush AI
                            create personalized fashion recommendations
                            based on your appearance, preferences,
                            and occasion.
                        </p>

                    </section>

                    {/* Analysis Card */}

                    <section className="mb-8 overflow-hidden rounded-3xl bg-gray-900 p-6 text-white shadow-xl lg:p-8">

                        <div className="grid gap-8 lg:grid-cols-2">

                            <div>

                                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                                    <Sparkles
                                        size={16}
                                        className="text-[#D4AF37]"
                                    />
                                    AI Style Analysis
                                </div>

                                <h3 className="text-3xl font-bold">
                                    Find colors and outfits
                                    <br />
                                    made for you.
                                </h3>

                                <p className="mt-4 max-w-md leading-7 text-gray-400">
                                    Our AI analyzes your photo and
                                    recommends colors, clothing,
                                    and complete outfits for your
                                    chosen occasion.
                                </p>

                                <label className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white px-5 py-3.5 font-semibold text-gray-900 transition hover:bg-gray-100">

                                    <Camera size={19} />

                                    {selectedFile
                                        ? "Change Photo"
                                        : "Upload Photo"}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />

                                </label>

                                {selectedFile && (
                                    <button
                                        onClick={handleAnalysis}
                                        className="ml-3 inline-flex items-center gap-2 rounded-xl bg-rose-500 px-5 py-3.5 font-semibold transition hover:bg-rose-600"
                                    >
                                        Analyze
                                        <ArrowRight size={18} />
                                    </button>
                                )}

                            </div>

                            {/* Upload Preview */}

                            <div className="flex min-h-64 items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5">

                                {selectedFile ? (
                                    <div className="relative h-full w-full">

                                        <img
                                            src={URL.createObjectURL(
                                                selectedFile
                                            )}
                                            alt="Selected"
                                            className="h-64 w-full rounded-2xl object-cover"
                                        />

                                        <button
                                            onClick={() =>
                                                setSelectedFile(null)
                                            }
                                            className="absolute right-3 top-3 rounded-full bg-black/60 p-2"
                                        >
                                            <X size={18} />
                                        </button>

                                    </div>
                                ) : (
                                    <div className="text-center">

                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                                            <Upload size={28} />
                                        </div>

                                        <p className="font-semibold">
                                            Upload your photo
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            JPG, PNG up to 5MB
                                        </p>

                                    </div>
                                )}

                            </div>

                        </div>

                    </section>

                    {/* Event Selection */}

                    <section className="mb-10">

                        <div className="mb-5 flex items-center justify-between">

                            <div>
                                <h3 className="text-xl font-bold">
                                    What's the occasion?
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Choose an event to personalize
                                    your recommendations.
                                </p>
                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

                            {events.map((event) => {

                                const Icon = event.icon;

                                const active =
                                    selectedEvent === event.id;

                                return (
                                    <button
                                        key={event.id}
                                        onClick={() =>
                                            setSelectedEvent(event.id)
                                        }
                                        className={`rounded-2xl border p-5 text-left transition ${
                                            active
                                                ? "border-rose-500 bg-rose-50 shadow-sm"
                                                : "border-gray-200 bg-white hover:border-rose-200"
                                        }`}
                                    >

                                        <div
                                            className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
                                                active
                                                    ? "bg-rose-500 text-white"
                                                    : "bg-gray-100 text-gray-600"
                                            }`}
                                        >
                                            <Icon size={21} />
                                        </div>

                                        <p className="font-semibold">
                                            {event.name}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-400">
                                            {event.description}
                                        </p>

                                    </button>
                                );
                            })}

                        </div>

                    </section>

                    {/* Stats */}

                    <section className="mb-10 grid gap-4 sm:grid-cols-3">

                        <StatCard
                            icon={Sparkles}
                            title="AI Analyses"
                            value="0"
                            description="Start your first analysis"
                        />

                        <StatCard
                            icon={Heart}
                            title="Saved Looks"
                            value="0"
                            description="Your favorite outfits"
                        />

                        <StatCard
                            icon={Palette}
                            title="Color Profile"
                            value="Not analyzed"
                            description="Discover your palette"
                        />

                    </section>

                    {/* Recommendations */}

                    <section>

                        <div className="mb-5 flex items-end justify-between">

                            <div>

                                <p className="text-sm font-semibold uppercase tracking-widest text-rose-500">
                                    For you
                                </p>

                                <h3 className="mt-1 text-2xl font-bold">
                                    Recommended Looks
                                </h3>

                            </div>

                            <button className="hidden items-center gap-2 text-sm font-semibold text-rose-500 sm:flex">
                                View all
                                <ArrowRight size={16} />
                            </button>

                        </div>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                            {outfits.map((outfit) => (

                                <div
                                    key={outfit.name}
                                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                                >

                                    <div className="relative">

                                        <img
                                            src={outfit.image}
                                            alt={outfit.name}
                                            className="h-72 w-full object-cover"
                                        />

                                        <button className="absolute right-4 top-4 rounded-full bg-white/90 p-2.5 shadow">
                                            <Heart
                                                size={18}
                                            />
                                        </button>

                                    </div>

                                    <div className="p-5">

                                        <div className="flex items-center justify-between">

                                            <div>

                                                <p className="text-lg font-bold">
                                                    {outfit.name}
                                                </p>

                                                <p className="mt-1 text-sm text-gray-400">
                                                    {outfit.category}
                                                </p>

                                            </div>

                                            <div className="flex items-center gap-1 text-sm font-semibold">
                                                <Star
                                                    size={15}
                                                    className="fill-[#D4AF37] text-[#D4AF37]"
                                                />
                                                {outfit.rating}
                                            </div>

                                        </div>

                                        <div className="mt-4 flex items-center gap-2">

                                            {outfit.colors.map(
                                                (color) => (
                                                    <span
                                                        key={color}
                                                        className="h-6 w-6 rounded-full border border-gray-200"
                                                        style={{
                                                            backgroundColor:
                                                                color
                                                        }}
                                                    />
                                                )
                                            )}

                                        </div>

                                        <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-gray-700">
                                            Explore Look
                                            <ArrowRight size={16} />
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
}

function NavItem({
    icon: Icon,
    label,
    active = false,
    onClick
}) {
    return (
        <button
            onClick={onClick}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                    ? "bg-rose-50 text-rose-500"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
        >
            <Icon size={19} />
            {label}
        </button>
    );
}

function StatCard({
    icon: Icon,
    title,
    value,
    description
}) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5">

            <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                    <Icon size={20} />
                </div>

            </div>

            <p className="mt-5 text-sm text-gray-500">
                {title}
            </p>

            <p className="mt-1 text-2xl font-bold">
                {value}
            </p>

            <p className="mt-1 text-xs text-gray-400">
                {description}
            </p>

        </div>
    );
}

export default Dashboard;