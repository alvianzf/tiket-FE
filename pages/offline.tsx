import Head from "next/head";

export default function OfflinePage() {
    return (
        <>
            <Head>
                <title>Offline — TiketQ</title>
            </Head>
            <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 text-center bg-white">
                <div className="w-24 h-24 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#ff5a00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728M5.636 5.636a9 9 0 000 12.728M12 8v4m0 4h.01" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-2xl font-black text-slate-800 mb-2">Tidak Ada Koneksi</h1>
                    <p className="text-slate-500 max-w-sm">Periksa koneksi internet Anda dan coba lagi. E-tiket yang sudah dibuka sebelumnya mungkin masih tersedia.</p>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-[#ff5a00] text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-colors"
                >
                    Coba Lagi
                </button>
            </div>
        </>
    );
}
