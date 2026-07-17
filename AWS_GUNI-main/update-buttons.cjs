const fs = require('fs');

const standardClass = 'px-8 min-h-[48px] flex items-center justify-center rounded-full font-bold uppercase tracking-wider text-sm text-white bg-white/5 border border-white/10 hover:border-[#a855f7] hover:text-[#a855f7] hover:bg-white/10 transition-all gap-2 active:scale-95';
const wFullStandardClass = 'w-full px-8 min-h-[48px] flex items-center justify-center rounded-full font-bold uppercase tracking-wider text-sm text-white bg-white/5 border border-white/10 hover:border-[#a855f7] hover:text-[#a855f7] hover:bg-white/10 transition-all gap-2 active:scale-95';

function updateEvents() {
  const file = 'd:/GUNI/AWS SBG GUNI/AWS_GUNI-main/src/pages/Events.tsx';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /className="mt-4 inline-flex items-center justify-center px-8 min-h-\[44px\] rounded-xl font-bold uppercase tracking-wider text-sm text-white bg-\[#a855f7\] hover:bg-\[#d946ef\] shadow-lg shadow-\[#a855f7\]\/25 transition-all active:scale-95"/g,
    `className="mt-4 ${standardClass}"`
  );
  content = content.replace(
    /className="w-full flex justify-center items-center px-4 min-h-\[48px\] text-xs font-bold uppercase tracking-wider text-black bg-white group-hover:bg-\[#a855f7\] group-hover:text-white rounded-full transition-colors gap-2 shrink-0 cursor-pointer active:scale-95"/g,
    `className="w-full flex justify-center items-center px-4 min-h-[48px] rounded-full font-bold uppercase tracking-wider text-sm text-white bg-white/5 border border-white/10 hover:border-[#a855f7] hover:text-[#a855f7] hover:bg-white/10 transition-all gap-2 shrink-0 cursor-pointer active:scale-95"`
  );
  fs.writeFileSync(file, content);
}

function updateEventDetail() {
  const file = 'd:/GUNI/AWS SBG GUNI/AWS_GUNI-main/src/pages/EventDetail.tsx';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /className="inline-flex items-center gap-2 px-5 py-2\.5 bg-\[#a855f7\] text-white font-bold uppercase text-xs rounded-full hover:bg-purple-600 transition-colors shadow-lg shadow-\[#a855f7\]\/75"/g,
    `className="${standardClass}"`
  );
  content = content.replace(
    /className="w-full h-12 rounded-full text-black bg-\[#ffaa00\] hover:bg-amber-400 font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-\[#ffaa00\]\/25 active:scale-95"/g,
    `className="${wFullStandardClass}"`
  );
  fs.writeFileSync(file, content);
}

function updateContact() {
  const file = 'd:/GUNI/AWS SBG GUNI/AWS_GUNI-main/src/pages/Contact.tsx';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /className="w-full py-3\.5 rounded-full font-bold uppercase tracking-wider text-xs text-white bg-\[#a855f7\] hover:bg-purple-600 shadow-md shadow-\[#a855f7\]\/25 hover:scale-101 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"/g,
    `className="w-full mt-4 ${standardClass}"`
  );
  content = content.replace(
    /className="px-6 py-2\.5 border border-white\/10 hover:border-\[#a855f7\] text-slate-300 hover:text-white rounded-full font-bold uppercase tracking-wider text-xs transition-all cursor-pointer hover:bg-\[#a855f7\]\/10"/g,
    `className="${standardClass}"`
  );
  fs.writeFileSync(file, content);
}

updateEvents();
updateEventDetail();
updateContact();
console.log('Buttons updated successfully!');
