export interface Lesson {
  id: string;
  day: number;
  title: string;
  situation: string;
  steps: string[];
  safetyWarning: string;
  practiceTip: string;
  videoId: string; // YouTube video ID
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
  };
  xp: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  days: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  emoji: string;
  lessons: Lesson[];
}

export const courses: Course[] = [
  {
    id: "7-day-beginner",
    title: "7 Day Self-Defense",
    description: "Essential survival techniques every woman must know",
    days: 7,
    difficulty: "Beginner",
    emoji: "🛡️",
    lessons: [
      {
        id: "7d-1",
        day: 1,
        title: "Escape From Behind Grab",
        situation: "An attacker grabs you from behind, wrapping their arms around your body. You need to react fast.",
        steps: [
          "Stamp down hard on the attacker's foot with your heel",
          "Drive your elbow backwards into their ribs or solar plexus",
          "If they loosen grip, turn quickly and strike their nose with palm heel",
          "Run immediately toward a crowded or well-lit area",
          "Scream loudly to attract attention"
        ],
        safetyWarning: "Never try to overpower an attacker. The goal is to escape, not fight. Practice slowly with a partner.",
        practiceTip: "Practice the elbow strike and foot stomp as a combo. Speed matters more than power.",
        videoId: "KVpxP3ZZtAc",
        quiz: {
          question: "What is the FIRST thing to do when grabbed from behind?",
          options: [
            "Try to punch the attacker",
            "Stamp hard on the attacker's foot",
            "Scream and stay still",
            "Try to negotiate"
          ],
          correctIndex: 1
        },
        xp: 50
      },
      {
        id: "7d-2",
        day: 2,
        title: "Wrist Grab Escape",
        situation: "Someone grabs your wrist tightly and tries to pull you. You need to break free quickly.",
        steps: [
          "Rotate your arm toward the attacker's thumb (weakest point)",
          "Pull sharply in the direction of their thumb gap",
          "Step back to create distance immediately",
          "Use your free hand to strike if needed",
          "Run to safety and call for help"
        ],
        safetyWarning: "Always pull toward the thumb gap - it's the weakest point of any grip.",
        practiceTip: "Practice rotating your wrist outward with a partner. The motion should be quick and decisive.",
        videoId: "KVpxP3ZZtAc",
        quiz: {
          question: "Which direction should you rotate to escape a wrist grab?",
          options: [
            "Away from the thumb",
            "Toward the attacker's thumb",
            "Straight up",
            "Downward"
          ],
          correctIndex: 1
        },
        xp: 50
      },
      {
        id: "7d-3",
        day: 3,
        title: "Bag Snatching Defense",
        situation: "A thief on a bike tries to snatch your bag while you're walking on the street.",
        steps: [
          "Let go of the bag immediately - your safety comes first",
          "Do NOT chase the attacker",
          "Move to a safe area immediately",
          "Call police (100) and report the incident",
          "Note down any details: vehicle, direction, description"
        ],
        safetyWarning: "Your bag is NOT worth your life. Never resist a bag snatcher - they may be armed.",
        practiceTip: "Carry bags on the side away from traffic. Keep phone and important items in inside pockets.",
        videoId: "KVpxP3ZZtAc",
        quiz: {
          question: "What should you do FIRST if someone snatches your bag?",
          options: [
            "Chase them immediately",
            "Let go and move to safety",
            "Fight back",
            "Scream and hold on tighter"
          ],
          correctIndex: 1
        },
        xp: 50
      },
      {
        id: "7d-4",
        day: 4,
        title: "Hair Grab Escape",
        situation: "An attacker grabs your hair from behind to drag you or control you.",
        steps: [
          "Grab the attacker's hand with both your hands (pin it to your head)",
          "This reduces pain and gives you control",
          "Turn your body toward the attacker while keeping grip on their hand",
          "Strike with your knee to their groin area",
          "Release, push away, and run to safety"
        ],
        safetyWarning: "Pinning the hand to your head prevents hair from being pulled out and gives you control.",
        practiceTip: "Practice the grip-and-turn motion. The key is to close the distance, not pull away.",
        videoId: "KVpxP3ZZtAc",
        quiz: {
          question: "When grabbed by the hair, what should you do first?",
          options: [
            "Try to pull away from the attacker",
            "Pin their hand to your head with both hands",
            "Scream without moving",
            "Kick randomly"
          ],
          correctIndex: 1
        },
        xp: 50
      },
      {
        id: "7d-5",
        day: 5,
        title: "Public Transport Safety",
        situation: "You notice someone behaving inappropriately or following you on a bus or train.",
        steps: [
          "Move to a crowded area of the vehicle immediately",
          "Stand near the driver or conductor",
          "Speak up loudly - say 'Please stop' or 'Don't touch me'",
          "Use your phone to record or call someone",
          "Get off at the next stop if you feel unsafe"
        ],
        safetyWarning: "Your voice is your strongest weapon in public. Speaking up immediately deters most harassers.",
        practiceTip: "Practice saying 'Stop' and 'Don't touch me' loudly. Confidence in your voice makes a huge difference.",
        videoId: "KVpxP3ZZtAc",
        quiz: {
          question: "What is the most effective action in public transport harassment?",
          options: [
            "Stay quiet and move away",
            "Speak up loudly and move to a crowded area",
            "Confront the person physically",
            "Wait until your stop"
          ],
          correctIndex: 1
        },
        xp: 50
      },
      {
        id: "7d-6",
        day: 6,
        title: "Elevator Attack Defense",
        situation: "You're alone in an elevator and someone enters who makes you uncomfortable.",
        steps: [
          "Stand near the control panel and buttons",
          "If threatened, press ALL floor buttons",
          "Press the emergency alarm button",
          "Use the elevator walls as leverage for strikes",
          "Exit at the first floor that opens"
        ],
        safetyWarning: "Always trust your instincts. If someone makes you uncomfortable, exit before the doors close.",
        practiceTip: "Make it a habit to stand near the buttons whenever you enter an elevator alone.",
        videoId: "KVpxP3ZZtAc",
        quiz: {
          question: "Where should you stand when alone in an elevator?",
          options: [
            "In the center",
            "Near the control panel and buttons",
            "In the far corner",
            "Near the door"
          ],
          correctIndex: 1
        },
        xp: 50
      },
      {
        id: "7d-7",
        day: 7,
        title: "Situational Awareness Mastery",
        situation: "Walking alone at night - how to stay alert and avoid becoming a target.",
        steps: [
          "Walk confidently with purpose - don't look lost",
          "Keep your phone accessible but not in your hand (reduces distraction)",
          "Stay in well-lit areas and near open shops",
          "Share your live location with a trusted contact",
          "Carry a personal safety alarm or whistle"
        ],
        safetyWarning: "Awareness is your best defense. Most attacks can be prevented by being alert.",
        practiceTip: "Practice the 'head up, eyes scanning' walk. Notice exits, people, and potential help points.",
        videoId: "KVpxP3ZZtAc",
        quiz: {
          question: "What is the BEST defense strategy when walking alone at night?",
          options: [
            "Walk fast with headphones on",
            "Carry a weapon",
            "Walk confidently, stay aware, stick to lit areas",
            "Always have someone with you"
          ],
          correctIndex: 2
        },
        xp: 75
      }
    ]
  },
  {
    id: "15-day-intermediate",
    title: "15 Day Training",
    description: "Intermediate defense techniques and scenario training",
    days: 15,
    difficulty: "Intermediate",
    emoji: "⚔️",
    lessons: []
  },
  {
    id: "21-day-protection",
    title: "21 Day Protection",
    description: "Advanced protection strategies and crisis management",
    days: 21,
    difficulty: "Advanced",
    emoji: "🔥",
    lessons: []
  },
  {
    id: "30-day-advanced",
    title: "30 Day Advanced",
    description: "Expert-level self-defense mastery program",
    days: 30,
    difficulty: "Expert",
    emoji: "🏆",
    lessons: []
  }
];
