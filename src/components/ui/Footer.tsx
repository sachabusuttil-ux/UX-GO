export default function Footer() {
    return (
        <footer className="w-full py-8 bg-black text-white text-center border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <span className="font-display font-bold uppercase tracking-widest text-sm">UX&GO Studio</span>
                <span className="text-white/50 text-xs font-sans">© {new Date().getFullYear()} Tous droits réservés.</span>
            </div>
        </footer>
    );
}
