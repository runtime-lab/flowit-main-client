export function DashboardBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden contain-[paint]">
            <div className="absolute -top-24 -right-12 h-[700px] w-[800px] opacity-80">
                <div className="absolute top-[200px] right-[150px] h-[350px] w-[350px] rounded-full bg-indigo-200/50 blur-[90px]" />
                <div className="absolute top-[80px] right-[250px] h-[450px] w-[280px] rotate-[-35deg] rounded-[60%_40%_50%_50%] bg-linear-to-br from-purple-300/50 to-indigo-200/20 blur-[60px]" />
                <div className="absolute top-[40px] right-[40px] h-[500px] w-[250px] rotate-45 rounded-[40%_60%_50%_50%] bg-linear-to-bl from-blue-300/50 to-indigo-300/20 blur-[60px]" />
                <div className="absolute top-[320px] right-[180px] h-[250px] w-[400px] rotate-[-15deg] rounded-[50%_50%_40%_60%] bg-linear-to-tr from-indigo-300/50 to-blue-200/20 blur-[70px]" />
                <div className="absolute top-[180px] right-[200px] h-[150px] w-[250px] rotate-25 rounded-[50%] bg-white/70 mix-blend-overlay blur-2xl" />
            </div>
        </div>
    );
}
