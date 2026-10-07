window.ATSAR_DEFAULTS = {
  appName: "Atsar",
  nickname: "Ibe",
  tagline: "Jejak baik, setiap hari.",
  location: "Pontianak, Indonesia",
  accent: "#195d63",
  darkMode: false,
  reminderEnabled: true,
  reminderTime: "09:00",
  qadhaInitial: 0,
  quranDailyTarget: 5,
  murojaahDailyTarget: 10,
  googleDriveClientId: "",
  prayerTimes: {
    subuh: "04:44",
    dzuhur: "12:05",
    ashar: "15:15",
    maghrib: "18:08",
    isya: "19:17"
  },
  prayerLabels: {
    subuh: "Subuh",
    dzuhur: "Dzuhur",
    ashar: "Ashar",
    maghrib: "Maghrib",
    isya: "Isya"
  },
  rawatib: {
    subuh: ["qab"],
    dzuhur: ["qab", "bad"],
    ashar: ["qab"],
    maghrib: ["qab", "bad"],
    isya: ["qab", "bad"]
  },
  sunnah: [
    { id: "dhuha", name: "Dhuha", note: "Setelah syuruq, sebelum Dzuhur", icon: "☀️", mode: "rakaat" },
    { id: "tahajud", name: "Tahajud", note: "Sepertiga malam terakhir", icon: "🌌", mode: "rakaat" },
    { id: "witir", name: "Witir", note: "Setelah Isya, sebelum Subuh", icon: "🌙", mode: "toggle" }
  ],
  fastTypes: ["Senin", "Kamis", "Ayyamul Bidh", "Daud", "Ramadan (wajib)", "Qadha", "Lainnya"],
  dzikirTargets: { pagi: 100, petang: 100 },
  targets: {
    prayer5: true,
    tilawah: true,
    tilawahPages: 5,
    dzikirPagi: false,
    dhuha: false,
    murojaah: false,
    murojaahAyat: 10
  },
  customHabits: []
};

window.ATSAR_SURAHS = [
"Al-Fatihah","Al-Baqarah","Ali 'Imran","An-Nisa","Al-Ma'idah","Al-An'am","Al-A'raf","Al-Anfal","At-Taubah","Yunus","Hud","Yusuf","Ar-Ra'd","Ibrahim","Al-Hijr","An-Nahl","Al-Isra","Al-Kahfi","Maryam","Taha","Al-Anbiya","Al-Hajj","Al-Mu'minun","An-Nur","Al-Furqan","Asy-Syu'ara","An-Naml","Al-Qasas","Al-'Ankabut","Ar-Rum","Luqman","As-Sajdah","Al-Ahzab","Saba","Fatir","Yasin","As-Saffat","Sad","Az-Zumar","Ghafir","Fussilat","Asy-Syura","Az-Zukhruf","Ad-Dukhan","Al-Jasiyah","Al-Ahqaf","Muhammad","Al-Fath","Al-Hujurat","Qaf","Az-Zariyat","At-Tur","An-Najm","Al-Qamar","Ar-Rahman","Al-Waqi'ah","Al-Hadid","Al-Mujadilah","Al-Hasyr","Al-Mumtahanah","As-Saff","Al-Jumu'ah","Al-Munafiqun","At-Tagabun","At-Talaq","At-Tahrim","Al-Mulk","Al-Qalam","Al-Haqqah","Al-Ma'arij","Nuh","Al-Jinn","Al-Muzzammil","Al-Muddassir","Al-Qiyamah","Al-Insan","Al-Mursalat","An-Naba","An-Nazi'at","'Abasa","At-Takwir","Al-Infitar","Al-Mutaffifin","Al-Insyiqaq","Al-Buruj","At-Tariq","Al-A'la","Al-Gasyiyah","Al-Fajr","Al-Balad","Asy-Syams","Al-Lail","Ad-Duha","Asy-Syarh","At-Tin","Al-'Alaq","Al-Qadr","Al-Bayyinah","Az-Zalzalah","Al-'Adiyat","Al-Qari'ah","At-Takasur","Al-'Asr","Al-Humazah","Al-Fil","Quraisy","Al-Ma'un","Al-Kausar","Al-Kafirun","An-Nasr","Al-Lahab","Al-Ikhlas","Al-Falaq","An-Nas"
];
