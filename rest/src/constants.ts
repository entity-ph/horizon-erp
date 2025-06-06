export const ACCEPTED_FILE_TYPES = [
  // Image types
  'image/png',
  'image/jpeg',
  'image/jpg',

  // Document types
  'application/pdf',           // PDF
  'application/msword',        // Word Document
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Word Document (.docx)

  // Video types
  'video/mp4',                // MP4 Video

  // Audio types
  'audio/mpeg',                // MP3 Audio
  'audio/wav',                 // WAV Audio
];

export const TRANSCRIBE_FILE_TYPES = [
  'video/mp4',
  'audio/mpeg',
  'audio/wav',
]


export const excludedEmails = ["wayne@dev.ph", "richard@entity.ph", "wayne@supervisor.ph", "wayne@accounting.ph", "wayne@reservation.ph", "wayne@cebu.ph", "wayne@calbayog.ph"];

export const MemoAudience = [
  'All Employees',
  'Supervisor Cebu',
  'Supervisor Calbayog',
  'All Supervisor',
  'Accounting Cebu',
  'Accounting Calbayog',
  'All Accounting',
  'Reservation Cebu',
  'Reservation Calbayog',
  'All Drivers'
]
