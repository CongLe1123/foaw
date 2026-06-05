import React from "react";

interface NotebookLayoutProps {
  title: string;
  children: React.ReactNode;
  sidePanel?: React.ReactNode;
}

export default function NotebookLayout({ title, children, sidePanel }: NotebookLayoutProps) {
  // Render 12 rings at the top of the notebook
  const ringsCount = 12;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative font-cute text-slate-800">
      
      {/* Notebook Wrapper - takes 8 columns on desktop */}
      <div className="lg:col-span-8 relative mt-8">
        
        {/* Spiral Rings Overlay */}
        <div className="absolute -top-4 inset-x-8 flex justify-between px-4 z-20 pointer-events-none">
          {Array.from({ length: ringsCount }).map((_, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {/* Ring loop */}
              <div className="w-3.5 h-10 bg-gradient-to-r from-slate-700 via-slate-400 to-slate-800 rounded-full border border-black shadow-md" />
              {/* Paper Hole */}
              <div className="w-2.5 h-2.5 bg-slate-900/10 rounded-full -mt-2.5 border border-black/5" />
            </div>
          ))}
        </div>

        {/* Notebook Body */}
        <div className="relative border-4 border-black rounded-3xl bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden min-h-[600px] flex">
          
          {/* Lined Paper Container */}
          <div className="flex-1 notebook-paper p-8 sm:p-12 relative z-10 flex flex-col justify-between">
            {/* Red vertical margin line on the left */}
            <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-red-400 opacity-60" />
            
            <div className="pl-6 space-y-6">
              {children}
            </div>
          </div>

          {/* Vertical rotated title strip on the right */}
          <div className="w-16 border-l-4 border-black bg-slate-50 flex items-center justify-center py-8 relative">
            <span 
              className="font-serif-hand font-black text-2xl tracking-widest text-black whitespace-nowrap"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)"
              }}
            >
              {title}
            </span>
          </div>
          
        </div>
      </div>

      {/* Side Panel (e.g. for peer feedback or narrative/metadata) - takes 4 columns */}
      {sidePanel && (
        <div className="lg:col-span-4 space-y-6">
          {sidePanel}
        </div>
      )}

    </div>
  );
}
