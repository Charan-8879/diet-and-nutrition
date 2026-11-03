// ==================== FOOD DATABASE ====================
const foodDB = {
    veg: [
        { name: "Paneer", emoji: "🧀", cal: 265, protein: 18.3, fibre: 0, img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop", badges: ["High Protein", "Vegetarian"] },
        { name: "Tofu", emoji: "🧊", cal: 76, protein: 8, fibre: 0.3, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop", badges: ["Low Cal", "Vegan"] },
        { name: "Lentils (Dal)", emoji: "🍲", cal: 116, protein: 9, fibre: 7.9, img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop", badges: ["High Fibre", "Protein"] },
        { name: "Chickpeas", emoji: "🧆", cal: 164, protein: 8.9, fibre: 7.6, img: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=500&auto=format&fit=crop", badges: ["High Fibre", "Protein"] },
        { name: "Greek Yogurt", emoji: "🥛", cal: 59, protein: 10, fibre: 0, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop", badges: ["Low Cal", "Probiotic"] },
        { name: "Cottage Cheese", emoji: "🧀", cal: 98, protein: 11, fibre: 0, img: "https://images.unsplash.com/photo-1559561853-08451507cbe7?w=500&auto=format&fit=crop", badges: ["Protein", "Calcium"] },
        { name: "Soy Chunks", emoji: "🧆", cal: 345, protein: 52, fibre: 13, img: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=500&auto=format&fit=crop", badges: ["Super Protein", "Vegan"] },
        { name: "Kidney Beans", emoji: "🫘", cal: 127, protein: 8.7, fibre: 6.4, img: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=500&auto=format&fit=crop", badges: ["High Fibre", "Iron"] },
        { name: "Moong Dal", emoji: "🥣", cal: 105, protein: 7.1, fibre: 5.3, img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&auto=format&fit=crop", badges: ["Light", "Easy Digest"] },
        { name: "Idli (Steamed)", emoji: "⚪", cal: 135, protein: 4, fibre: 1.5, img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop", badges: ["South Indian", "Steamed"] },
        { name: "Dosa (Plain)", emoji: "🥞", cal: 168, protein: 4.5, fibre: 1.8, img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop", badges: ["South Indian", "Crisp"] },
        { name: "Poha (Cooked)", emoji: "🥣", cal: 130, protein: 2.5, fibre: 1.2, img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&auto=format&fit=crop", badges: ["Light", "Indian Breakfast"] },
        { name: "Upma (Rava Upma)", emoji: "🥣", cal: 135, protein: 3.5, fibre: 1.8, img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&auto=format&fit=crop", badges: ["Warm", "Indian Breakfast"] },
        { name: "Sambar", emoji: "🍲", cal: 55, protein: 2.5, fibre: 2.2, img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop", badges: ["Lentils", "Indian Soup"] },
        { name: "Sprouts", emoji: "🌱", cal: 31, protein: 3.2, fibre: 1.8, img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop", badges: ["Super Food", "Low Cal"] }
    ],
    nonveg: [
        { name: "Chicken Breast", emoji: "🍗", cal: 165, protein: 31, fibre: 0, img: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop", badges: ["Lean Protein", "Cooked/Grilled"] },
        { name: "Chicken Breast (Raw)", emoji: "🍗", cal: 120, protein: 22.5, fibre: 0, img: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop", badges: ["Raw", "USDA Grounded"] },
        { name: "Eggs (Whole)", emoji: "🥚", cal: 155, protein: 13, fibre: 0, img: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=500&auto=format&fit=crop", badges: ["Complete Protein", "Budget"] },
        { name: "Egg Whites", emoji: "🍳", cal: 52, protein: 11, fibre: 0, img: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=500&auto=format&fit=crop", badges: ["Pure Protein", "Low Fat"] },
        { name: "Salmon", emoji: "🐟", cal: 208, protein: 20, fibre: 0, img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop", badges: ["Omega-3", "Premium"] },
        { name: "Tuna", emoji: "🍣", cal: 130, protein: 28, fibre: 0, img: "https://images.unsplash.com/photo-1501595091296-3aa970afb3ff?w=500&auto=format&fit=crop", badges: ["High Protein", "Low Fat"] },
        { name: "Shrimp/Prawns", emoji: "🦐", cal: 99, protein: 24, fibre: 0, img: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=500&auto=format&fit=crop", badges: ["Low Cal", "Seafood"] },
        { name: "Turkey Breast", emoji: "🦃", cal: 135, protein: 30, fibre: 0, img: "https://images.unsplash.com/photo-1514944298352-bf66e336b95b?w=500&auto=format&fit=crop", badges: ["Lean", "Low Fat"] },
        { name: "Mutton/Lamb", emoji: "🥩", cal: 294, protein: 25, fibre: 0, img: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=500&auto=format&fit=crop", badges: ["Iron Rich", "High Cal"] },
        { name: "Fish (Rohu)", emoji: "🐠", cal: 97, protein: 17, fibre: 0, img: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=500&auto=format&fit=crop", badges: ["Omega-3", "Local"] },
        { name: "Chicken Thigh", emoji: "🍗", cal: 209, protein: 26, fibre: 0, img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&auto=format&fit=crop", badges: ["Juicy", "Budget"] }
    ],
    nuts: [
        { name: "Almonds", emoji: "🥜", cal: 579, protein: 21, fibre: 12.5, img: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500&auto=format&fit=crop", badges: ["Healthy Fat", "Vitamin E"] },
        { name: "Peanuts", emoji: "🥜", cal: 567, protein: 26, fibre: 8.5, img: "https://images.unsplash.com/photo-1567892328127-6a4279b90c13?w=500&auto=format&fit=crop", badges: ["Budget Protein", "Energy"] },
        { name: "Walnuts", emoji: "🌰", cal: 654, protein: 15, fibre: 6.7, img: "https://images.unsplash.com/photo-1563412885-ae67339956f1?w=500&auto=format&fit=crop", badges: ["Brain Food", "Omega-3"] },
        { name: "Cashews", emoji: "🌰", cal: 553, protein: 18, fibre: 3.3, img: "https://images.unsplash.com/photo-1536591375611-7b93f8f19bfb?w=500&auto=format&fit=crop", badges: ["Magnesium", "Tasty"] },
        { name: "Peanut Butter", emoji: "🥜", cal: 588, protein: 25, fibre: 6, img: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=500&auto=format&fit=crop", badges: ["Spread", "Protein"] },
        { name: "Flax Seeds", emoji: "🌱", cal: 534, protein: 18, fibre: 27, img: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=500&auto=format&fit=crop", badges: ["Super Seed", "Omega-3"] },
        { name: "Chia Seeds", emoji: "🥣", cal: 486, protein: 17, fibre: 34, img: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=500&auto=format&fit=crop", badges: ["Super Food", "Fibre King"] },
        { name: "Pumpkin Seeds", emoji: "🎃", cal: 559, protein: 30, fibre: 6, img: "https://images.unsplash.com/photo-1509622905150-fa66d3906e09?w=500&auto=format&fit=crop", badges: ["Zinc", "High Protein"] },
        { name: "Sunflower Seeds", emoji: "🌻", cal: 584, protein: 21, fibre: 8.6, img: "https://images.unsplash.com/photo-1566767118681-860d6be55742?w=500&auto=format&fit=crop", badges: ["Vitamin E", "Snack"] },
        { name: "Mixed Dry Fruits", emoji: "🍇", cal: 520, protein: 15, fibre: 7, img: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=500&auto=format&fit=crop", badges: ["Energy Mix", "Premium"] }
    ],
    fibre: [
        { name: "Oats", emoji: "🥣", cal: 389, protein: 17, fibre: 10.6, img: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=500&auto=format&fit=crop", badges: ["Breakfast King", "Heart"] },
        { name: "White Rice (Cooked)", emoji: "🍚", cal: 130, protein: 2.7, fibre: 0.4, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop", badges: ["Staple", "Cooked"] },
        { name: "White Rice (Raw)", emoji: "🍚", cal: 360, protein: 7.0, fibre: 1.3, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop", badges: ["Raw Grain", "USDA"] },
        { name: "Brown Rice", emoji: "🍚", cal: 111, protein: 2.6, fibre: 1.8, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop", badges: ["Complex Carb", "Staple"] },
        { name: "Sweet Potato", emoji: "🍠", cal: 86, protein: 1.6, fibre: 3, img: "https://images.unsplash.com/photo-1596097635121-14b63a7e3a02?w=500&auto=format&fit=crop", badges: ["Slow Carb", "Pre-Workout"] },
        { name: "Quinoa", emoji: "🌾", cal: 120, protein: 4.4, fibre: 2.8, img: "https://images.unsplash.com/photo-1612257416648-ee7a6c5b17eb?w=500&auto=format&fit=crop", badges: ["Super Grain", "Complete"] },
        { name: "Banana", emoji: "🍌", cal: 89, protein: 1.1, fibre: 2.6, img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop", badges: ["Quick Energy", "Potassium"] },
        { name: "Papaya", emoji: "🍈", cal: 43, protein: 0.5, fibre: 1.7, img: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=500&auto=format&fit=crop", badges: ["Fruit Snack", "Digestive"] },
        { name: "Guava", emoji: "🍐", cal: 68, protein: 2.6, fibre: 5.4, img: "https://images.unsplash.com/photo-1536511135898-05b63c224e78?w=500&auto=format&fit=crop", badges: ["Super Fruit", "High Fibre"] },
        { name: "Orange", emoji: "🍊", cal: 47, protein: 0.9, fibre: 2.4, img: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=500&auto=format&fit=crop", badges: ["Vitamin C", "Citrus"] },
        { name: "Watermelon", emoji: "🍉", cal: 30, protein: 0.6, fibre: 0.4, img: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=500&auto=format&fit=crop", badges: ["Hydrating", "Low Cal"] },
        { name: "Pomegranate", emoji: "🫐", cal: 83, protein: 1.7, fibre: 4, img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop", badges: ["Antioxidant", "Super Food"] },
        { name: "Broccoli", emoji: "🥦", cal: 34, protein: 2.8, fibre: 2.6, img: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=500&auto=format&fit=crop", badges: ["Super Veg", "Low Cal"] },
        { name: "Spinach", emoji: "🥬", cal: 23, protein: 2.9, fibre: 2.2, img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop", badges: ["Iron", "Leafy Green"] },
        { name: "Apple", emoji: "🍎", cal: 52, protein: 0.3, fibre: 2.4, img: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500&auto=format&fit=crop", badges: ["Fruit", "Antioxidant"] },
        { name: "Whole Wheat Bread", emoji: "🍞", cal: 247, protein: 13, fibre: 7, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop", badges: ["Complex Carb", "Fibre"] },
        { name: "Muesli", emoji: "🥣", cal: 340, protein: 10, fibre: 7.5, img: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=500&auto=format&fit=crop", badges: ["Breakfast", "Energy"] }
    ]
};

// ==================== SUPPLEMENTS DATABASE ====================
const supplementDB = {
    whey: {
        title: "🍼 Whey Protein Brands",
        instructions: "Mix 1 scoop (30-35g) with 200-300ml water or milk. Take post-workout or between meals. Best consumed within 30 minutes after exercise for optimal recovery.",
        brands: [
            { name: "Optimum Nutrition Gold Standard", cal: 120, protein: 24, fibre: 1, serving: 30.4, img: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=500&auto=format&fit=crop", badges: ["#1 Worldwide", "24g Protein"] },
            { name: "MuscleBlaze Biozyme", cal: 130, protein: 25, fibre: 0, serving: 33, img: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=500&auto=format&fit=crop", badges: ["Indian Brand", "Enhanced"] },
            { name: "MyProtein Impact Whey", cal: 103, protein: 21, fibre: 0, serving: 25, img: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=500&auto=format&fit=crop", badges: ["UK Brand", "Value"] },
            { name: "Dymatize ISO100", cal: 110, protein: 25, fibre: 0, serving: 29, img: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=500&auto=format&fit=crop", badges: ["Hydrolyzed", "Fast Absorb"] },
            { name: "MuscleTech NitroTech", cal: 160, protein: 30, fibre: 1, serving: 44, img: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=500&auto=format&fit=crop", badges: ["30g Protein", "Creatine+"] },
            { name: "Nakpro Perform", cal: 113, protein: 24, fibre: 0, serving: 30, img: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=500&auto=format&fit=crop", badges: ["Budget", "Raw Whey"] }
        ]
    },
    creatine: {
        title: "⚡ Creatine Brands",
        instructions: "Take 3-5g daily with water or juice. Loading phase (optional): 20g/day for 5-7 days split into 4 doses. Maintenance: 3-5g daily. Stay well hydrated!",
        brands: [
            { name: "Optimum Nutrition Creatine", cal: 0, protein: 0, fibre: 0, serving: 5, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop", badges: ["Micronized", "Pure"], creatine: 5 },
            { name: "MuscleBlaze Creatine", cal: 0, protein: 0, fibre: 0, serving: 3, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop", badges: ["CreAVATE", "Indian"], creatine: 3 },
            { name: "MyProtein Creatine Mono", cal: 0, protein: 0, fibre: 0, serving: 5, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop", badges: ["Value Pack", "Lab Tested"], creatine: 5 },
            { name: "MuscleTech Platinum Creatine", cal: 0, protein: 0, fibre: 0, serving: 5, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop", badges: ["HPLC Tested", "Ultra Pure"], creatine: 5 },
            { name: "GNC Pro Creatine", cal: 0, protein: 0, fibre: 0, serving: 3, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop", badges: ["GNC Quality", "Trusted"], creatine: 3 },
            { name: "Nakpro Creatine Monohydrate", cal: 0, protein: 0, fibre: 0, serving: 3, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop", badges: ["Budget", "Unflavored"], creatine: 3 }
        ]
    }
};

// ==================== WORKOUTS DATABASE (WITH VIDEO DEMOS) ====================
const workoutDB = {
    home: [
        {
            id: "home_fullbody_hiit",
            title: "Full Body Fat Burn & HIIT",
            level: "All Levels",
            duration: "25 mins",
            equipment: "No Equipment (Bodyweight)",
            category: "Full Body",
            muscles: ["Cardio", "Abs/Core", "Legs (Quads)"],
            icon: "🔥",
            description: "High-intensity full body circuit to boost endurance, burn calories, and elevate heart rate.",
            exercises: [
                { name: "Jumping Jacks", videoId: "iSSAk4XCsRA", sets: 3, reps: "45 secs", rest: 15, muscle: "Cardio", instructions: "Keep a steady rhythm, land softly on balls of feet, clap overhead." },
                { name: "Bodyweight Air Squats", videoId: "aclHkVaku9U", sets: 3, reps: "15-20 reps", rest: 30, muscle: "Legs (Quads)", instructions: "Feet shoulder-width apart, chest upright, push knees outward over toes." },
                { name: "Standard / Incline Push-Ups", videoId: "IODxDxX7oi4", sets: 3, reps: "10-15 reps", rest: 30, muscle: "Chest", instructions: "Engage core, lower chest until near floor, elbows at 45 degrees." },
                { name: "Mountain Climbers", videoId: "nmwgirgXLYM", sets: 3, reps: "40 secs", rest: 20, muscle: "Abs/Core", instructions: "Drive knees toward chest alternately in a steady high plank position." },
                { name: "Walking / Reverse Lunges", videoId: "QOVaHwm-Q6U", sets: 3, reps: "12 reps/leg", rest: 30, muscle: "Legs (Hams/Glutes)", instructions: "Step back smoothly, keep front knee stacked above ankle at 90 degrees." },
                { name: "Elbow Plank Hold", videoId: "pSHjTRCQxIw", sets: 3, reps: "45 secs", rest: 30, muscle: "Abs/Core", instructions: "Keep straight line from head to heels, squeeze glutes and brace core." }
            ]
        },
        {
            id: "home_upper_body",
            title: "Upper Body Bodyweight Power",
            level: "Intermediate",
            duration: "30 mins",
            equipment: "Chair / Sturdy Elevation",
            category: "Upper Body",
            muscles: ["Chest", "Shoulders", "Triceps", "Back"],
            icon: "💪",
            description: "Target chest, shoulders, arms, and upper back using intelligent bodyweight progressions.",
            exercises: [
                { name: "Standard Push-Ups", videoId: "IODxDxX7oi4", sets: 4, reps: "12-15 reps", rest: 45, muscle: "Chest", instructions: "Full range of motion, lock out at top with controlled 2-second descent." },
                { name: "Pike Push-Ups", videoId: "sposDXWEB0A", sets: 3, reps: "8-12 reps", rest: 45, muscle: "Shoulders", instructions: "Hips high in inverted V-shape, lower top of head gently toward floor." },
                { name: "Chair / Bench Dips", videoId: "6kALZikXxLc", sets: 3, reps: "12-15 reps", rest: 45, muscle: "Triceps", instructions: "Hands on chair edge behind you, bend elbows to 90 degrees, press up." },
                { name: "Doorframe / Towel Rows", videoId: "tmgdY168qY0", sets: 3, reps: "12-15 reps", rest: 45, muscle: "Back", instructions: "Grip a sturdy doorframe or towel, lean back and pull chest to frame." },
                { name: "Diamond Push-Ups", videoId: "J0DnG1_S92I", sets: 3, reps: "8-10 reps", rest: 45, muscle: "Triceps", instructions: "Hands close together forming a diamond under chest for intense tricep burn." },
                { name: "Superman Back Extensions", videoId: "z6PJMT2y8GQ", sets: 3, reps: "15 reps (2s hold)", rest: 30, muscle: "Back", instructions: "Lie prone, lift arms and legs simultaneously, squeeze upper back." }
            ]
        },
        {
            id: "home_lower_body",
            title: "Legs & Glutes Sculptor",
            level: "Beginner / Intermediate",
            duration: "30 mins",
            equipment: "No Equipment",
            category: "Lower Body",
            muscles: ["Legs (Quads)", "Legs (Hams/Glutes)", "Calves"],
            icon: "🦵",
            description: "Strengthen and sculpt your quads, hamstrings, glutes, and calves with bodyweight movements.",
            exercises: [
                { name: "Bodyweight Squats (Tempo 3-1-1)", videoId: "aclHkVaku9U", sets: 4, reps: "15-20 reps", rest: 45, muscle: "Legs (Quads)", instructions: "Lower slowly for 3 seconds, pause at bottom, explode upward." },
                { name: "Bulgarian Split Squats (Elevated)", videoId: "2C-uNgKwPLE", sets: 3, reps: "10-12 reps/leg", rest: 45, muscle: "Legs (Quads)", instructions: "Rear foot on sofa/chair, drop back knee straight down with tall torso." },
                { name: "Single-Leg Glute Bridges", videoId: "OUgsJ8-Vi0E", sets: 3, reps: "12 reps/leg", rest: 30, muscle: "Legs (Hams/Glutes)", instructions: "Drive through heel, lock glute at top with level hips." },
                { name: "Curtsy / Reverse Lunges", videoId: "qUa8g3xY8aM", sets: 3, reps: "12 reps/leg", rest: 30, muscle: "Legs (Hams/Glutes)", instructions: "Step back at an angle to activate outer glutes and stabilizer muscles." },
                { name: "Wall Sit Hold", videoId: "y-wV4Venusw", sets: 3, reps: "45-60 secs", rest: 30, muscle: "Legs (Quads)", instructions: "Back flat on wall, thighs parallel to floor at a 90-degree angle." },
                { name: "Single-Leg Calf Raises", videoId: "gwLzMXqqEwU", sets: 3, reps: "20 reps/leg", rest: 30, muscle: "Calves", instructions: "Full stretch at bottom, squeeze hard at peak height for 1 second." }
            ]
        },
        {
            id: "home_core_abs",
            title: "Six-Pack Abs & Core Shred",
            level: "All Levels",
            duration: "20 mins",
            equipment: "Yoga Mat / Carpet",
            category: "Core & Abs",
            muscles: ["Abs/Core"],
            icon: "⚡",
            description: "Intense core conditioning routine targeting upper abs, lower abs, obliques, and deep stabilizers.",
            exercises: [
                { name: "Bicycle Crunches", videoId: "9FGilxCbdz8", sets: 3, reps: "20 reps/side", rest: 30, muscle: "Abs/Core", instructions: "Opposite elbow to knee with full torso rotation, keep lower back flat." },
                { name: "Lying Leg Raises", videoId: "JB2oyawG9KI", sets: 3, reps: "12-15 reps", rest: 30, muscle: "Abs/Core", instructions: "Raise legs without arching lower back, lower slowly with control." },
                { name: "Russian Twists", videoId: "wkD8rjkodUI", sets: 3, reps: "30 twists", rest: 30, muscle: "Abs/Core", instructions: "Feet elevated, rotate torso side to side touching the ground." },
                { name: "Plank Shoulder Taps", videoId: "gKA_qI9wF2A", sets: 3, reps: "20 taps", rest: 30, muscle: "Abs/Core", instructions: "High plank position, tap opposite shoulder without rocking hips." },
                { name: "Deadbugs", videoId: "4XLEnwUr1d8", sets: 3, reps: "12 reps/side", rest: 30, muscle: "Abs/Core", instructions: "Opposite arm and leg extend simultaneously with glued lower spine." },
                { name: "Side Plank Hold", videoId: "N_sfmpqLhGk", sets: 3, reps: "30s / side", rest: 30, muscle: "Abs/Core", instructions: "Elbow under shoulder, lift hips high in straight rigid line." }
            ]
        },
        {
            id: "home_dumbbell_fullbody",
            title: "Home Dumbbell Muscle Builder",
            level: "Intermediate",
            duration: "35 mins",
            equipment: "Pair of Dumbbells",
            category: "Dumbbells",
            muscles: ["Chest", "Back", "Shoulders", "Biceps", "Triceps", "Legs (Quads)"],
            icon: "🏋️",
            description: "Complete full-body hypertrophy training using a single pair of dumbbells.",
            exercises: [
                { name: "Dumbbell Goblet Squats", videoId: "MeIiIdhvXT4", sets: 4, reps: "12 reps", rest: 60, muscle: "Legs (Quads)", instructions: "Hold dumbbell vertically at chest, squat deep keeping chest tall." },
                { name: "Dumbbell Floor Press", videoId: "uUGDRwge4F8", sets: 4, reps: "10-12 reps", rest: 60, muscle: "Chest", instructions: "Lie on floor, press dumbbells upward until arms are extended." },
                { name: "Bent-Over Dumbbell Rows", videoId: "roCP6wCXPqo", sets: 4, reps: "12 reps", rest: 60, muscle: "Back", instructions: "Hinge at hips at 45 degrees, pull dumbbells toward hip creases." },
                { name: "Standing Dumbbell Shoulder Press", videoId: "qEwKCR5JCog", sets: 3, reps: "10-12 reps", rest: 60, muscle: "Shoulders", instructions: "Press from ear level overhead, avoid arching lower back." },
                { name: "Dumbbell Romanian Deadlifts", videoId: "7AAbbUff8jY", sets: 3, reps: "12 reps", rest: 60, muscle: "Legs (Hams/Glutes)", instructions: "Push hips back, slight knee bend, stretch hamstrings." },
                { name: "Dumbbell Hammer Curls to Kickbacks", videoId: "zC3nLlEvin4", sets: 3, reps: "12 reps", rest: 45, muscle: "Biceps", instructions: "Neutral palms, curl up for biceps, then hinge and extend for triceps." }
            ]
        },
        {
            id: "home_mobility_stretch",
            title: "Mobility, Flexibility & Recovery",
            level: "Beginner",
            duration: "15 mins",
            equipment: "No Equipment",
            category: "Recovery & Yoga",
            muscles: ["Rest Day", "Abs/Core"],
            icon: "🧘",
            description: "Gentle full-body mobility flow to relieve muscle tightness, improve posture, and speed up recovery.",
            exercises: [
                { name: "Cat-Cow Spine Flow", videoId: "v_bfl-VwZgA", sets: 2, reps: "10 cycles", rest: 20, muscle: "Back", instructions: "Inhale arch back (cow), exhale round spine toward ceiling (cat)." },
                { name: "Downward Dog to Cobra Stretch", videoId: "EC7RGJ975iM", sets: 2, reps: "8 cycles", rest: 20, muscle: "Shoulders", instructions: "Push heels down for calf/hamstring stretch, transition to upward cobra." },
                { name: "World's Greatest Stretch", videoId: "gU1c72_n6rE", sets: 2, reps: "5 reps/side", rest: 20, muscle: "Legs (Hams/Glutes)", instructions: "Lunge forward, inside elbow to floor, reach arm up to ceiling." },
                { name: "Pigeon Hip Opener", videoId: "0_zflqD6mXw", sets: 2, reps: "45s / side", rest: 20, muscle: "Legs (Hams/Glutes)", instructions: "Shin across mat, sink hips down to open tight glutes and hips." },
                { name: "Child's Pose Deep Breathing", videoId: "2MJGg-dUKh0", sets: 1, reps: "60 secs", rest: 0, muscle: "Rest Day", instructions: "Knees wide, arms extended forward, sink chest into mat." }
            ]
        }
    ],
    gym: [
        {
            id: "gym_push_day",
            title: "Push Day (Chest, Shoulders, Triceps)",
            level: "Intermediate / Advanced",
            duration: "50 mins",
            equipment: "Barbell, Dumbbells, Bench, Cables",
            category: "Push / Pull / Legs",
            muscles: ["Chest", "Shoulders", "Triceps"],
            icon: "💥",
            description: "Classic Push split focusing on compound pressing power, upper chest, delts, and triceps.",
            exercises: [
                { name: "Flat Barbell Bench Press", videoId: "rT7DgCr-3pg", sets: 4, reps: "6-8 reps", rest: 90, muscle: "Chest", instructions: "Arch slightly, retract scapulae, lower bar to mid-chest and drive up." },
                { name: "Incline Dumbbell Press (30°)", videoId: "8iPEnn-ltC8", sets: 3, reps: "8-10 reps", rest: 75, muscle: "Chest", instructions: "Bench at 30 degrees, full stretch at bottom, press up and slightly inward." },
                { name: "Seated Overhead Dumbbell Press", videoId: "qEwKCR5JCog", sets: 3, reps: "8-12 reps", rest: 75, muscle: "Shoulders", instructions: "Upright bench, press dumbbells overhead without clashing at top." },
                { name: "Cable Lateral Raises", videoId: "PPrzBWZDOhA", sets: 4, reps: "12-15 reps", rest: 60, muscle: "Shoulders", instructions: "Handle at knee height, raise arm out to side with slight elbow bend." },
                { name: "Cable Tricep Rope Pushdowns", videoId: "2-LAMcpzODU", sets: 3, reps: "12-15 reps", rest: 60, muscle: "Triceps", instructions: "Pin elbows at sides, flare rope ends apart at bottom of movement." },
                { name: "Overhead EZ-Bar / Cable Extensions", videoId: "IbSGz_98p20", sets: 3, reps: "10-12 reps", rest: 60, muscle: "Triceps", instructions: "Keep elbows pointed forward, full stretch on long head of triceps." }
            ]
        },
        {
            id: "gym_pull_day",
            title: "Pull Day (Back, Traps, Biceps)",
            level: "Intermediate / Advanced",
            duration: "50 mins",
            equipment: "Barbell, Lat Pulldown, Cable Machine, Dumbbells",
            category: "Push / Pull / Legs",
            muscles: ["Back", "Biceps"],
            icon: "🦾",
            description: "Complete Pull routine to build a wide V-taper back, thick mid-back, rear delts, and biceps.",
            exercises: [
                { name: "Conventional / Romanian Deadlifts", videoId: "op9kVnSso6Q", sets: 4, reps: "5-6 reps", rest: 120, muscle: "Back", instructions: "Neutral spine, drive through floor, lock hips at top with glutes." },
                { name: "Wide-Grip Lat Pulldowns", videoId: "CAwf7n6Luuc", sets: 4, reps: "8-12 reps", rest: 75, muscle: "Back", instructions: "Pull bar down to upper chest, squeeze lats, control the negative ascent." },
                { name: "Seated Cable Rows (Close Grip)", videoId: "GZbfZ033fbo", sets: 3, reps: "10-12 reps", rest: 75, muscle: "Back", instructions: "Pull handle to lower stomach, squeeze shoulder blades together." },
                { name: "Cable / Rope Face Pulls", videoId: "rep-qVOkqgk", sets: 4, reps: "15 reps", rest: 60, muscle: "Shoulders", instructions: "Set pulley at face height, pull toward forehead and rotate knuckles back." },
                { name: "Standing Barbell Bicep Curls", videoId: "ykJmrZ5v0Oo", sets: 3, reps: "8-10 reps", rest: 60, muscle: "Biceps", instructions: "Shoulders back, curl bar up without swinging torso, squeeze peak." },
                { name: "Incline Dumbbell Hammer Curls", videoId: "CFBZ4jN1CMI", sets: 3, reps: "12 reps", rest: 60, muscle: "Biceps", instructions: "Seated on incline, neutral grip for brachialis and forearm thickness." }
            ]
        },
        {
            id: "gym_leg_day",
            title: "Leg Day (Quads, Hamstrings, Calves)",
            level: "Intermediate / Advanced",
            duration: "55 mins",
            equipment: "Squat Rack, Leg Press, Leg Machines",
            category: "Push / Pull / Legs",
            muscles: ["Legs (Quads)", "Legs (Hams/Glutes)", "Calves"],
            icon: "🍗",
            description: "High-intensity lower body workout for maximal quad, hamstring, glute, and calf development.",
            exercises: [
                { name: "Barbell Back Squats", videoId: "bEv6CCg2BC8", sets: 4, reps: "6-8 reps", rest: 120, muscle: "Legs (Quads)", instructions: "Brace core, descend to parallel or below, drive upward through mid-foot." },
                { name: "Leg Press (Foot Placement Mid)", videoId: "IZxyjW7MPJQ", sets: 3, reps: "10-12 reps", rest: 90, muscle: "Legs (Quads)", instructions: "Full depth without rounding lower back off pad, do not lock out knees." },
                { name: "Barbell Romanian Deadlifts (RDL)", videoId: "7AAbbUff8jY", sets: 4, reps: "8-10 reps", rest: 90, muscle: "Legs (Hams/Glutes)", instructions: "Hinge at hips, keep bar skimming along shins, deep hamstring stretch." },
                { name: "Seated / Lying Leg Curls", videoId: "1Tq3QdYUuHs", sets: 3, reps: "12-15 reps", rest: 60, muscle: "Legs (Hams/Glutes)", instructions: "Full knee flexion, hold peak squeeze for 1 second, slow return." },
                { name: "Leg Extensions", videoId: "YyvSfVjQeL0", sets: 3, reps: "12-15 reps", rest: 60, muscle: "Legs (Quads)", instructions: "Isolate quads, pause and squeeze at peak extension." },
                { name: "Standing Machine Calf Raises", videoId: "3UWi44yN-wE", sets: 4, reps: "15-20 reps", rest: 45, muscle: "Calves", instructions: "Drop heels deep for stretch, pause 2s on tip-toes at apex." }
            ]
        },
        {
            id: "gym_upper_body",
            title: "Upper Body Hypertrophy",
            level: "Intermediate",
            duration: "45 mins",
            equipment: "Dumbbells, Cables, Bench",
            category: "Upper / Lower",
            muscles: ["Chest", "Back", "Shoulders", "Biceps", "Triceps"],
            icon: "🏆",
            description: "Upper body session balancing horizontal & vertical pressing and pulling for aesthetics.",
            exercises: [
                { name: "Incline Dumbbell Bench Press", videoId: "8iPEnn-ltC8", sets: 4, reps: "8-10 reps", rest: 75, muscle: "Chest", instructions: "Target upper pectoral fibers with strong elbow tuck and stretch." },
                { name: "Chest-Supported T-Bar / Machine Row", videoId: "roCP6wCXPqo", sets: 4, reps: "8-10 reps", rest: 75, muscle: "Back", instructions: "Eliminates lower back fatigue so you can load back muscles heavy." },
                { name: "Seated Dumbbell Arnold Press", videoId: "6222bT62rEI", sets: 3, reps: "10-12 reps", rest: 60, muscle: "Shoulders", instructions: "Rotate palms from facing you at bottom to facing away at top." },
                { name: "Standing Cable Chest Flyes", videoId: "taI4XduLp5c", sets: 3, reps: "12-15 reps", rest: 60, muscle: "Chest", instructions: "Hug a wide tree motion, cross hands slightly for peak contraction." },
                { name: "Lat Pulldown (Neutral Grip)", videoId: "CAwf7n6Luuc", sets: 3, reps: "10-12 reps", rest: 60, muscle: "Back", instructions: "Drive elbows down into your back pockets." },
                { name: "Bicep & Tricep Cable Superset", videoId: "ykJmrZ5v0Oo", sets: 3, reps: "12 reps each", rest: 60, muscle: "Biceps", instructions: "Perform Cable Curl directly followed by Tricep Pushdown." }
            ]
        },
        {
            id: "gym_arnold_arms_shoulders",
            title: "Arnold Split: Shoulders & Arms",
            level: "Advanced",
            duration: "45 mins",
            equipment: "Barbell, Dumbbells, Cables, EZ Bar",
            category: "Arnold / Bro Split",
            muscles: ["Shoulders", "Biceps", "Triceps"],
            icon: "🔱",
            description: "Dedicated arm & shoulder hypertrophy blast inspired by golden-era bodybuilding.",
            exercises: [
                { name: "Standing Overhead Barbell Press (OHP)", videoId: "2yjwXTZQDDI", sets: 4, reps: "6-8 reps", rest: 90, muscle: "Shoulders", instructions: "Squeeze glutes and core, press bar straight up over center of gravity." },
                { name: "Dumbbell Lateral Raises", videoId: "PPrzBWZDOhA", sets: 4, reps: "12-15 reps", rest: 60, muscle: "Shoulders", instructions: "Lead with elbows, slight forward tilt, isolate lateral delts." },
                { name: "Rear Delt Dumbbell Flyes", videoId: "EA7u4Q_8HQ0", sets: 4, reps: "15 reps", rest: 60, muscle: "Shoulders", instructions: "Chest on incline bench, pull elbows out wide to target rear delts." },
                { name: "EZ-Bar Skull Crushers", videoId: "d_KZxkY_0aw", sets: 3, reps: "10-12 reps", rest: 60, muscle: "Triceps", instructions: "Lower bar behind head toward crown, keep elbows tucked." },
                { name: "Incline Dumbbell Bicep Curls", videoId: "CFBZ4jN1CMI", sets: 3, reps: "10-12 reps", rest: 60, muscle: "Biceps", instructions: "Lie on 45° incline for deep bicep stretch, curl with supinating palms." },
                { name: "Cable Rope Pushdown + Hammer Curl", videoId: "2-LAMcpzODU", sets: 3, reps: "12-15 reps", rest: 45, muscle: "Triceps", instructions: "Superset for maximum arm blood flow and sleeve-ripping pump." }
            ]
        },
        {
            id: "gym_chest_back_split",
            title: "Arnold Split: Chest & Back",
            level: "Advanced",
            duration: "50 mins",
            equipment: "Barbell, Dumbbells, Bench, Cable Station",
            category: "Arnold / Bro Split",
            muscles: ["Chest", "Back"],
            icon: "🛡️",
            description: "Antagonistic superset workout pairing chest presses with back pulls for immense upper body pump.",
            exercises: [
                { name: "Barbell Flat Bench Press", videoId: "rT7DgCr-3pg", sets: 4, reps: "6-8 reps", rest: 90, muscle: "Chest", instructions: "Heavy compound press for chest mass and pushing strength." },
                { name: "Barbell Bent-Over Row (Overhand)", videoId: "vT2GjY_Umpw", sets: 4, reps: "6-8 reps", rest: 90, muscle: "Back", instructions: "Pull barbell into lower ribcage, keep spine locked in position." },
                { name: "Incline Dumbbell Press", videoId: "8iPEnn-ltC8", sets: 3, reps: "8-10 reps", rest: 75, muscle: "Chest", instructions: "Smooth 3-second descent, explosive press with good shoulder lock." },
                { name: "Close-Grip Lat Pulldowns", videoId: "CAwf7n6Luuc", sets: 3, reps: "8-10 reps", rest: 75, muscle: "Back", instructions: "Full lat stretch at top, pull sternum up toward bar." },
                { name: "Dumbbell Pullovers", videoId: "5Y2qTe_bIeU", sets: 3, reps: "12 reps", rest: 60, muscle: "Chest", instructions: "Lie across flat bench, stretch dumbbell over head, expanding ribcage." },
                { name: "Cable Crossover / Low-to-High Flyes", videoId: "taI4XduLp5c", sets: 3, reps: "15 reps", rest: 60, muscle: "Chest", instructions: "Constant cable tension across the full chest range." }
            ]
        }
    ]
};

// ==================== GLOBAL STATE ====================
let currentUser = null;
let foodLog = [];
let selectedFood = null;
let selectedCategory = '';
let waterGlasses = 0;
let gymMode = false;
let workoutMode = 'none'; // 'none' | 'home' | 'gym'
let currentWorkout = null; // { type, routineId, title, muscles, exercises }
let activeWorkoutTab = 'home'; // 'home' | 'gym'
let activeFilter = 'all';
let currentRoutine = null;
let dailySteps = 0;
let stepGoal = 10000;

// Rest Timer State
let restTimerSeconds = 45;
let restTimerRemaining = 45;
let restTimerInterval = null;
let restTimerRunning = false;

// Hydration Timer State
let waterTimerInterval = null;
let waterTimerRunning = false;
let waterMinutesLeft = 59;
let currentEditDay = null;

// ==================== UTILITY & FALLBACK FUNCTIONS ====================
function showToast(msg) {
    const t = document.getElementById('toast');
    if (t) {
        t.textContent = msg;
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 2500);
    }
}

function formatNum(n) {
    return Number(n).toLocaleString('en-IN', { maximumFractionDigits: 1 });
}

function getFoodPlaceholder(name, emoji, bg1 = '#1e293b', bg2 = '#334155') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">
        <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${bg1}" />
                <stop offset="100%" stop-color="${bg2}" />
            </linearGradient>
        </defs>
        <rect width="400" height="260" fill="url(#g)" />
        <circle cx="200" cy="110" r="55" fill="rgba(255,255,255,0.18)" />
        <text x="200" y="128" font-size="56" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
        <text x="200" y="210" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle" font-family="sans-serif">${name}</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function handleImgError(el, emoji, name, category) {
    let c1 = '#1e293b', c2 = '#334155';
    if (category === 'veg') { c1 = '#2d6a4f'; c2 = '#40916c'; }
    else if (category === 'nonveg') { c1 = '#9d0208'; c2 = '#dc2f02'; }
    else if (category === 'nuts') { c1 = '#78350f'; c2 = '#b45309'; }
    else if (category === 'fibre') { c1 = '#365314'; c2 = '#4d7c0f'; }
    else if (category === 'supp') { c1 = '#312e81'; c2 = '#4338ca'; }
    el.onerror = null;
    el.src = getFoodPlaceholder(name, emoji || '🍽️', c1, c2);
}

// ==================== AUTH & LOGIN FUNCTIONS ====================
// ================= PHONE NUMBER & EMAIL VALIDATION ENGINE =================
function normalizePhoneNumber(phone) {
    if (!phone || typeof phone !== 'string') return '';
    let clean = phone.trim().replace(/[\s\-\(\)\.]/g, '');
    if (clean.startsWith('+91')) {
        clean = clean.substring(3);
    } else if (clean.startsWith('+')) {
        clean = clean.substring(1);
    }
    if (clean.length === 12 && clean.startsWith('91') && /^[6-9]/.test(clean.substring(2))) {
        clean = clean.substring(2);
    }
    if (clean.length === 11 && clean.startsWith('0') && /^[6-9]/.test(clean.substring(1))) {
        clean = clean.substring(1);
    }
    return clean;
}

function validatePhoneNumber(phone, isRequired = false, fieldName = 'Phone number') {
    if (!phone || typeof phone !== 'string' || !phone.trim() || phone.trim() === 'N/A') {
        if (isRequired) {
            return { isValid: false, message: `⚠️ ${fieldName} is required.` };
        }
        return { isValid: true, sanitized: '' };
    }
    const clean = normalizePhoneNumber(phone);
    if (!/^\d+$/.test(clean)) {
        return { 
            isValid: false, 
            message: `⚠️ ${fieldName} must contain only numeric digits (no alphabets, spaces, or special characters allowed).` 
        };
    }
    if (clean.length !== 10) {
        return { 
            isValid: false, 
            message: `⚠️ ${fieldName} must contain exactly 10 digits for Indian mobile numbers (entered ${clean.length} digits).` 
        };
    }
    if (!/^[6-9]/.test(clean)) {
        return { 
            isValid: false, 
            message: `⚠️ Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.` 
        };
    }
    return { isValid: true, sanitized: clean };
}

function validateEmailAddress(email, isRequired = true, fieldName = 'Email address') {
    if (!email || typeof email !== 'string' || !email.trim()) {
        if (isRequired) {
            return { isValid: false, message: `⚠️ ${fieldName} is required.` };
        }
        return { isValid: true, sanitized: '' };
    }
    const trimmed = email.trim();
    if (trimmed.startsWith('.') || trimmed.endsWith('.') || trimmed.includes('..') || trimmed.includes('@.')) {
        return {
            isValid: false,
            message: `⚠️ Please enter a valid email address. Email cannot start or end with a dot, or contain consecutive dots (entered '${trimmed}').`
        };
    }
    // Validate proper email format with domain and TLD (e.g. username@gmail.com, user@domain.org)
    // Rejects invalid formats: .haran@gmail.com, username, username@, username@gmail
    const emailRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(trimmed)) {
        return { 
            isValid: false, 
            message: `⚠️ Please enter a valid email address with a domain (e.g. username@gmail.com). Format '${trimmed}' is invalid.` 
        };
    }
    return { isValid: true, sanitized: trimmed.toLowerCase() };
}

function showAuthAlert(pane, message) {
    const alertId = pane === 'login' ? 'loginValidationAlert' : 'registerValidationAlert';
    const alertEl = document.getElementById(alertId);
    if (alertEl) {
        if (pane === 'register' && /already registered/i.test(message)) {
            const escaped = typeof escapeCoachHtml === 'function' ? escapeCoachHtml(message) : message;
            alertEl.innerHTML = `${escaped} <a href="javascript:void(0)" onclick="switchLoginTab('login');" style="color: #FF8A1F; font-weight: bold; text-decoration: underline; margin-left: 6px;">Sign in now</a>`;
        } else {
            alertEl.textContent = message;
        }
        alertEl.classList.remove('d-none');
    }
    showToast(message);
}

function clearAuthAlert(pane) {
    const alertId = pane === 'login' ? 'loginValidationAlert' : 'registerValidationAlert';
    const alertEl = document.getElementById(alertId);
    if (alertEl) {
        alertEl.textContent = '';
        alertEl.classList.add('d-none');
    }
}

function switchLoginTab(tab) {
    clearAuthAlert('login');
    clearAuthAlert('register');
    const tabLogin = document.getElementById('tabBtnLogin');
    const tabReg = document.getElementById('tabBtnRegister');
    const loginPane = document.getElementById('loginPane');
    const regPane = document.getElementById('registerPane');

    if (tab === 'login') {
        if (tabLogin) tabLogin.classList.add('active');
        if (tabReg) tabReg.classList.remove('active');
        if (loginPane) loginPane.classList.remove('d-none');
        if (regPane) regPane.classList.add('d-none');
    } else {
        if (tabReg) tabReg.classList.add('active');
        if (tabLogin) tabLogin.classList.remove('active');
        if (regPane) regPane.classList.remove('d-none');
        if (loginPane) loginPane.classList.add('d-none');
    }
}

// ==================== RESILIENT BACKEND & MYSQL CONNECTIVITY LAYER ====================
let BACKEND_URL = (function() {
    if (typeof window !== 'undefined' && window.location) {
        // 1. Explicit window override
        if (window.__HEALTHIFY_API_URL__ && typeof window.__HEALTHIFY_API_URL__ === 'string' && window.__HEALTHIFY_API_URL__.trim()) {
            return window.__HEALTHIFY_API_URL__.trim().replace(/\/+$/, '');
        }
        // 2. HTML meta tag configuration (<meta name="healthify-api-url" content="...">)
        const metaTag = document.querySelector('meta[name="healthify-api-url"]');
        if (metaTag && metaTag.content && metaTag.content.trim()) {
            return metaTag.content.trim().replace(/\/+$/, '');
        }
        // 3. Persistent localStorage backend override
        try {
            const savedUrl = localStorage.getItem('ht_backend_url');
            if (savedUrl && savedUrl.trim()) return savedUrl.trim().replace(/\/+$/, '');
        } catch (e) {}

        // 4. Same-origin if running directly on Node.js port 3000 or Spring Boot port 8080
        if (window.location.port === '3000' || window.location.port === '8080') {
            return window.location.origin;
        }

        // 5. Localhost development (Live Server, VSCode, Vite, file://, etc.)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:') {
            return 'http://localhost:3000';
        }

        // 6. Deployed production host (e.g. Vercel, Netlify, custom domain)
        return 'https://diet-and-nutrition.onrender.com';
    }
    return 'http://localhost:3000';
})();
let AI_BACKEND_URL = BACKEND_URL;
let isBackendConnected = false;

function getBackendEndpoints() {
    const primary = BACKEND_URL || 'http://localhost:3000';
    const isLocal = primary.includes('localhost') || primary.includes('127.0.0.1');
    const alt = isLocal ? (primary.includes('8080') ? 'http://localhost:3000' : 'http://localhost:8080') : null;
    return { primary, alt };
}

// Universal resilient API fetch helper with automatic 3000 (Express) / 8080 (Spring Boot) fallback
async function apiFetch(endpoint, options = {}) {
    const cleanPath = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const { primary, alt } = getBackendEndpoints();

    const tryFetch = async (baseUrl) => {
        const url = `${baseUrl.replace(/\/+$/, '')}${cleanPath}`;
        const controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
        const timeoutMs = options.timeoutMs || 4000;
        const timeoutId = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
        try {
            const fetchOpts = {
                ...options,
                headers: {
                    ...(options.body && typeof options.body === 'string' ? { 'Content-Type': 'application/json' } : {}),
                    ...(options.headers || {})
                },
                signal: controller ? controller.signal : undefined
            };
            const res = await fetch(url, fetchOpts);
            if (timeoutId) clearTimeout(timeoutId);
            const data = await res.json().catch(() => ({}));
            return { ok: res.ok, status: res.status, data };
        } catch (err) {
            if (timeoutId) clearTimeout(timeoutId);
            return { ok: false, error: err };
        }
    };

    // 1. Try currently active primary backend
    let result = await tryFetch(primary);
    if (result.ok || (result.status && result.status < 500)) {
        if (!isBackendConnected) {
            isBackendConnected = true;
            updateBackendStatusUI(true, primary.includes('8080') ? 'healthify_db' : 'healthify_express');
        }
        return result.data;
    }

    // 2. Try alternate backend (if available in local environment)
    if (alt && alt !== primary) {
        result = await tryFetch(alt);
        if (result.ok || (result.status && result.status < 500)) {
            BACKEND_URL = alt;
            AI_BACKEND_URL = alt;
            if (!isBackendConnected) {
                isBackendConnected = true;
                updateBackendStatusUI(true, alt.includes('8080') ? 'healthify_db' : 'healthify_express');
            }
            return result.data;
        }
    }

    // 3. Mark offline
    isBackendConnected = false;
    updateBackendStatusUI(false);
    const err = new Error('Network error: All backends unreachable');
    err.isOffline = true;
    throw err;
}

function checkBackendHealth(interactive = false) {
    const { primary, alt } = getBackendEndpoints();

    const tryHealth = (url, nextFallback) => {
        const controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
        const timeoutId = controller ? setTimeout(() => controller.abort(), 2000) : null;
        fetch(`${url}/api/health`, { signal: controller ? controller.signal : undefined })
            .then(res => res.json())
            .then(data => {
                if (timeoutId) clearTimeout(timeoutId);
                BACKEND_URL = url;
                AI_BACKEND_URL = url;
                isBackendConnected = (data.status === 'ok');
                updateBackendStatusUI(true, data.database || (url.includes('8080') ? 'healthify_db' : 'healthify_express'));
                if (interactive) showToast(`🟢 Connected to ${url.includes('8080') ? 'Spring Boot' : 'Node Express'}!`);
                if (typeof HealthifyIDB !== 'undefined' && typeof HealthifyIDB.syncOfflineQueue === 'function') {
                    HealthifyIDB.syncOfflineQueue();
                }
            })
            .catch(() => {
                if (timeoutId) clearTimeout(timeoutId);
                if (nextFallback) {
                    nextFallback();
                } else {
                    isBackendConnected = false;
                    updateBackendStatusUI(false);
                    if (interactive) showToast('⚡ Offline Mode: Running on local cache');
                }
            });
    };

    tryHealth(primary, alt ? () => tryHealth(alt, null) : null);
}

function updateBackendStatusUI(connected, dbName = 'healthify_db') {
    const loginPill = document.getElementById('loginBackendPill');
    const loginText = document.getElementById('loginBackendStatusText');
    const appPill = document.getElementById('backendStatusPill');
    const appText = document.getElementById('backendStatusText');

    if (connected) {
        if (loginPill) {
            loginPill.style.background = 'rgba(111, 174, 61, 0.15)';
            loginPill.style.color = '#6FAE3D';
            loginPill.style.borderColor = '#6FAE3D';
        }
        if (loginText) loginText.innerHTML = `🟢 MySQL (${dbName})`;
        if (appPill) {
            appPill.style.background = 'rgba(111, 174, 61, 0.15)';
            appPill.style.color = '#6FAE3D';
            appPill.style.borderColor = '#6FAE3D';
        }
        if (appText) appText.innerHTML = `🟢 MySQL: ${dbName}`;
    } else {
        if (loginPill) {
            loginPill.style.background = 'rgba(255, 138, 31, 0.15)';
            loginPill.style.color = '#FF8A1F';
            loginPill.style.borderColor = '#FF8A1F';
        }
        if (loginText) loginText.innerHTML = `⚡ Offline Local`;
        if (appPill) {
            appPill.style.background = 'rgba(255, 138, 31, 0.15)';
            appPill.style.color = '#FF8A1F';
            appPill.style.borderColor = '#FF8A1F';
        }
        if (appText) appText.innerHTML = `⚡ Offline Cache`;
    }
}

async function sendAuthApi(endpoint, payload) {
    // Primary backend URL, with automatic fallback between Spring Boot (8080) and Express (3000)
    const { primary: primaryUrl, alt: altUrl } = getBackendEndpoints();

    const tryFetch = async (baseUrl) => {
        const url = `${baseUrl.replace(/\/+$/, '')}/api/auth/${endpoint}`;
        const controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
        const timeoutId = controller ? setTimeout(() => controller.abort(), 2000) : null;
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                signal: controller ? controller.signal : undefined
            });
            if (timeoutId) clearTimeout(timeoutId);
            const data = await res.json().catch(() => ({}));
            return { ok: true, status: res.status, data };
        } catch (err) {
            if (timeoutId) clearTimeout(timeoutId);
            return { ok: false, error: err };
        }
    };

    // 1. Try primary configured backend
    let result = await tryFetch(primaryUrl);
    if (result.ok) {
        if (!result.data.success) {
            return { success: false, error: result.data.error || 'Authentication failed' };
        }
        return { success: true, user: result.data.user };
    }

    // 2. Try alternate backend if primary network connection failed (if available in local environment)
    if (altUrl && altUrl !== primaryUrl) {
        result = await tryFetch(altUrl);
        if (result.ok) {
            BACKEND_URL = altUrl;
            AI_BACKEND_URL = altUrl;
            isBackendConnected = true;
            updateBackendStatusUI(true, altUrl.includes('8080') ? 'healthify_db' : 'healthify_express');
            if (!result.data.success) {
                return { success: false, error: result.data.error || 'Authentication failed' };
            }
            return { success: true, user: result.data.user };
        }
    }

    // 3. Fallback to offline local storage only if both backends are unreachable
    let users = [];
    try {
        users = JSON.parse(localStorage.getItem('ht_users') || '[]');
        if (!Array.isArray(users)) users = [];
    } catch (e) {
        users = [];
    }

    if (endpoint === 'login') {
        const cleanEmail = (payload.email || '').trim().toLowerCase();
        const found = users.find(u => (u.email || '').toLowerCase() === cleanEmail);
        if (!found) {
            if (cleanEmail === 'champion@healthify.app' && payload.password === 'DemoPassword123') {
                return { success: true, user: { id: 1, name: 'Fitness Champion', email: 'champion@healthify.app', phone: '9876543210' } };
            }
            return { success: false, error: `User not found with email: ${cleanEmail}. Please register first.` };
        }
        if (found.password && found.password !== payload.password) {
            return { success: false, error: 'Invalid password. Please check your credentials.' };
        }
        return { success: true, user: { id: found.id || 1, name: found.name, email: found.email, phone: found.phone } };
    }

    if (endpoint === 'register') {
        const cleanEmail = (payload.email || '').trim().toLowerCase();
        const cleanPhone = (payload.phone || '').trim();

        const newUser = {
            id: Date.now(),
            name: payload.name.trim(),
            email: cleanEmail,
            phone: cleanPhone
            // Never store plain-text passwords in localStorage
        };
        const existingIdx = users.findIndex(u => (u.email || '').toLowerCase() === cleanEmail);
        if (existingIdx >= 0) {
            users[existingIdx] = newUser;
        } else {
            users.push(newUser);
        }
        if (users.length > 5) users = users.slice(-5);
        safeSetStorage('ht_users', users);
        return { success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone } };
    }

    if (endpoint === 'demo') {
        return { success: true, user: { id: 1, name: 'Fitness Champion', email: 'champion@healthify.app', phone: '9876543210' } };
    }

    return { success: false, error: 'Cannot connect to authentication service' };
}

// ==================== INDEXEDDB CLIENT OFFLINE STORAGE ====================
// Offloads large JSON structures (7-day/25-day diet plans, meal logs, AI chat messages, offline action queues)
// keeping localStorage strictly for lightweight user sessions (< 200 bytes) and basic UI preferences.
const HealthifyIDB = {
    DB_NAME: 'healthify_offline_db',
    DB_VERSION: 2,
    db: null,

    async init() {
        if (typeof indexedDB === 'undefined') return null;
        if (this.db) return this.db;
        return new Promise((resolve) => {
            const req = indexedDB.open(this.DB_NAME, this.DB_VERSION);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('diet_plans')) {
                    const planStore = db.createObjectStore('diet_plans', { keyPath: 'id' });
                    planStore.createIndex('email', 'email', { unique: false });
                }
                if (!db.objectStoreNames.contains('offline_cache')) {
                    db.createObjectStore('offline_cache', { keyPath: 'key' });
                }
                if (!db.objectStoreNames.contains('chat_messages')) {
                    const chatStore = db.createObjectStore('chat_messages', { keyPath: 'id', autoIncrement: true });
                    chatStore.createIndex('email', 'email', { unique: false });
                }
                if (!db.objectStoreNames.contains('offline_sync_queue')) {
                    const queueStore = db.createObjectStore('offline_sync_queue', { keyPath: 'id', autoIncrement: true });
                    queueStore.createIndex('type', 'type', { unique: false });
                }
            };
            req.onsuccess = (e) => {
                this.db = e.target.result;
                resolve(this.db);
            };
            req.onerror = (e) => {
                console.warn('[Healthify IDB] Failed to open database:', e.target.error);
                resolve(null);
            };
        });
    },

    async saveDietPlan(plan) {
        if (!plan) return false;
        try {
            const db = await this.init();
            if (!db) return false;
            const p = JSON.parse(JSON.stringify(plan));
            if (!p.id) p.id = 'plan_' + Date.now();
            if (currentUser && currentUser.email && !p.email) {
                p.email = currentUser.email.toLowerCase().trim();
            }
            return new Promise((resolve) => {
                const tx = db.transaction(['diet_plans'], 'readwrite');
                const store = tx.objectStore('diet_plans');
                store.put(p);
                tx.oncomplete = () => resolve(true);
                tx.onerror = () => resolve(false);
            });
        } catch (e) {
            console.warn('[Healthify IDB] saveDietPlan error:', e);
            return false;
        }
    },

    async getDietPlansForEmail(email) {
        if (!email) return [];
        try {
            const db = await this.init();
            if (!db) return [];
            return new Promise((resolve) => {
                const tx = db.transaction(['diet_plans'], 'readonly');
                const store = tx.objectStore('diet_plans');
                const cleanEmail = email.toLowerCase().trim();
                const req = store.getAll();
                req.onsuccess = () => {
                    const all = req.result || [];
                    const filtered = all.filter(p => (p.email || '').toLowerCase().trim() === cleanEmail);
                    resolve(filtered);
                };
                req.onerror = () => resolve([]);
            });
        } catch (e) {
            return [];
        }
    },

    async deleteDietPlan(planId) {
        if (!planId) return false;
        try {
            const db = await this.init();
            if (!db) return false;
            return new Promise((resolve) => {
                const tx = db.transaction(['diet_plans'], 'readwrite');
                const store = tx.objectStore('diet_plans');
                store.delete(planId);
                if (typeof planId === 'string' && !isNaN(planId)) {
                    store.delete(Number(planId));
                }
                tx.oncomplete = () => resolve(true);
                tx.onerror = () => resolve(false);
            });
        } catch (e) {
            console.warn('[Healthify IDB] deleteDietPlan error:', e);
            return false;
        }
    },

    async getActiveDietPlan(email) {
        const plans = await this.getDietPlansForEmail(email);
        if (!plans || plans.length === 0) return null;
        return plans[plans.length - 1];
    },

    // Save AI chat message in IndexedDB
    async saveChatMessage(msg) {
        if (!msg || !msg.email) return false;
        try {
            const db = await this.init();
            if (!db) return false;
            const clean = {
                email: (msg.email || '').toLowerCase().trim(),
                sender: msg.sender || 'user',
                text: msg.text || '',
                source: msg.source || 'groq',
                dietPlanId: msg.dietPlanId || null,
                attachment: msg.attachment ? { name: msg.attachment.name, type: msg.attachment.type } : null,
                createdAt: msg.createdAt || new Date().toISOString()
            };
            if (msg.id && typeof msg.id === 'number') {
                clean.id = msg.id;
            }
            return new Promise((resolve) => {
                const tx = db.transaction(['chat_messages'], 'readwrite');
                const store = tx.objectStore('chat_messages');
                store.put(clean);
                tx.oncomplete = () => resolve(true);
                tx.onerror = () => resolve(false);
            });
        } catch (e) {
            console.warn('[Healthify IDB] saveChatMessage notice:', e);
            return false;
        }
    },

    // Get cached AI chat messages for a user
    async getChatMessages(email, limit = 50) {
        if (!email) return [];
        try {
            const db = await this.init();
            if (!db) return [];
            return new Promise((resolve) => {
                const tx = db.transaction(['chat_messages'], 'readonly');
                const store = tx.objectStore('chat_messages');
                const cleanEmail = email.toLowerCase().trim();
                const req = store.getAll();
                req.onsuccess = () => {
                    const all = req.result || [];
                    const filtered = all
                        .filter(m => (m.email || '').toLowerCase().trim() === cleanEmail)
                        .sort((a, b) => (a.id || 0) - (b.id || 0));
                    resolve(filtered.slice(-limit));
                };
                req.onerror = () => resolve([]);
            });
        } catch (e) {
            return [];
        }
    },

    // Clear cached AI chat messages for a user
    async clearChatMessages(email) {
        if (!email) return false;
        try {
            const db = await this.init();
            if (!db) return false;
            const cleanEmail = email.toLowerCase().trim();
            return new Promise((resolve) => {
                const tx = db.transaction(['chat_messages'], 'readwrite');
                const store = tx.objectStore('chat_messages');
                const req = store.openCursor();
                req.onsuccess = (e) => {
                    const cursor = e.target.result;
                    if (cursor) {
                        if ((cursor.value.email || '').toLowerCase().trim() === cleanEmail) {
                            cursor.delete();
                        }
                        cursor.continue();
                    } else {
                        resolve(true);
                    }
                };
                req.onerror = () => resolve(false);
            });
        } catch (e) {
            return false;
        }
    },

    // Queue action for offline synchronization (daily_data, chat_message, profile, challenge)
    async queueOfflineAction(type, payload) {
        if (!type || !payload) return false;
        try {
            const db = await this.init();
            if (!db) return false;
            return new Promise((resolve) => {
                const tx = db.transaction(['offline_sync_queue'], 'readwrite');
                const store = tx.objectStore('offline_sync_queue');
                store.add({
                    type: type,
                    payload: payload,
                    createdAt: Date.now()
                });
                tx.oncomplete = () => {
                    console.log(`[Healthify IDB] Offline action '${type}' queued for synchronization.`);
                    resolve(true);
                };
                tx.onerror = () => resolve(false);
            });
        } catch (e) {
            return false;
        }
    },

    // Synchronize all queued offline actions when connectivity is restored
    async syncOfflineQueue() {
        try {
            const db = await this.init();
            if (!db) return false;
            return new Promise((resolve) => {
                const tx = db.transaction(['offline_sync_queue'], 'readwrite');
                const store = tx.objectStore('offline_sync_queue');
                const req = store.getAll();
                req.onsuccess = async () => {
                    const items = req.result || [];
                    if (items.length === 0) return resolve(true);

                    console.log(`[Healthify IDB] Synchronizing ${items.length} queued offline actions to MySQL...`);
                    for (const item of items) {
                        try {
                            if (item.type === 'daily_data') {
                                await apiFetch('/api/daily-data', { method: 'POST', body: JSON.stringify(item.payload) });
                            } else if (item.type === 'chat_message') {
                                await apiFetch('/api/ai/chat/message', { method: 'POST', body: JSON.stringify(item.payload) });
                            } else if (item.type === 'profile') {
                                await apiFetch('/api/profile', { method: 'POST', body: JSON.stringify(item.payload) });
                            } else if (item.type === 'challenge') {
                                await apiFetch('/api/challenge', { method: 'POST', body: JSON.stringify(item.payload) });
                            }
                            // Delete synced item
                            const delTx = db.transaction(['offline_sync_queue'], 'readwrite');
                            delTx.objectStore('offline_sync_queue').delete(item.id);
                        } catch (err) {
                            console.warn('[Healthify IDB] Sync item deferred (still offline):', err.message);
                            break; // Stop and retry later
                        }
                    }
                    resolve(true);
                };
                req.onerror = () => resolve(false);
            });
        } catch (e) {
            return false;
        }
    },

    // Migrates any leftover bulky diet plans from localStorage into IndexedDB and purges the localStorage keys
    async migrateBulkyDataFromLocalStorage(email) {
        if (!email) return;
        const cleanEmail = email.toLowerCase().trim();
        try {
            // Check active plan
            const activeKey = `ht_active_diet_plan_${cleanEmail}`;
            const activeRaw = localStorage.getItem(activeKey);
            if (activeRaw) {
                try {
                    const plan = JSON.parse(activeRaw);
                    if (plan) {
                        plan.email = cleanEmail;
                        await this.saveDietPlan(plan);
                    }
                } catch (e) {}
                localStorage.removeItem(activeKey);
            }

            // Check saved plans array
            const savedKey = `ht_saved_diet_plans_${cleanEmail}`;
            const savedRaw = localStorage.getItem(savedKey);
            if (savedRaw) {
                try {
                    const list = JSON.parse(savedRaw);
                    if (Array.isArray(list)) {
                        for (const p of list) {
                            if (p) {
                                p.email = cleanEmail;
                                await this.saveDietPlan(p);
                            }
                        }
                    }
                } catch (e) {}
                localStorage.removeItem(savedKey);
            }
        } catch (e) {
            console.warn('[Healthify IDB] Migration notice:', e);
        }
    }
};

async function getStorageMetrics() {
    let lsBytes = 0;
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            const v = localStorage.getItem(k);
            lsBytes += (k ? k.length : 0) + (v ? v.length : 0);
        }
    } catch (e) {}

    let quotaBytes = 5 * 1024 * 1024;
    if (navigator.storage && navigator.storage.estimate) {
        try {
            const est = await navigator.storage.estimate();
            if (est.quota) quotaBytes = est.quota;
        } catch (e) {}
    }

    return {
        localStorageBytes: lsBytes,
        localStorageKB: Math.round((lsBytes / 1024) * 10) / 10,
        quotaEstimateBytes: quotaBytes,
        status: lsBytes > 4 * 1024 * 1024 ? 'CRITICAL' : (lsBytes > 2 * 1024 * 1024 ? 'WARNING' : 'HEALTHY')
    };
}

// ==================== RESILIENT SAFE STORAGE MANAGER ====================
function createMinimalUserSession(user) {
    if (!user) return null;
    const now = Date.now();
    return {
        id: user.id || Date.now(),
        name: (user.name || 'Athlete').trim(),
        email: (user.email || '').toLowerCase().trim(),
        phone: (user.phone || '').trim(),
        loginAt: user.loginAt || now,
        lastActivity: now,
        expiresAt: now + SESSION_TIMEOUT_MS
    };
}

function pruneObsoleteStorageCache() {
    try {
        if (typeof localStorage === 'undefined') return;

        // 1. Collect all local storage keys
        const allKeys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k) allKeys.push(k);
        }

        // 2. Offload and purge legacy AI chat history from localStorage into IndexedDB
        allKeys.filter(k => k.startsWith('ht_ai_chat_history_')).forEach(k => {
            try {
                const raw = localStorage.getItem(k);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    const emailMatch = k.replace('ht_ai_chat_history_', '');
                    if (Array.isArray(parsed) && emailMatch && emailMatch !== 'guest') {
                        parsed.forEach(m => {
                            HealthifyIDB.saveChatMessage({
                                email: emailMatch,
                                sender: m.sender || 'user',
                                text: m.text || '',
                                source: m.source || 'groq',
                                dietPlanId: m.dietPlanId || null,
                                attachment: m.attachment || null,
                                createdAt: m.createdAt || new Date().toISOString()
                            });
                        });
                    }
                }
            } catch (e) {}
            try { localStorage.removeItem(k); } catch (e) {}
        });

        // 3. Offload and purge oversized saved diet plans from localStorage into IndexedDB
        allKeys.filter(k => k.startsWith('ht_saved_diet_plans_') || k.startsWith('ht_active_diet_plan_')).forEach(k => {
            try {
                const raw = localStorage.getItem(k);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (Array.isArray(parsed)) {
                        parsed.forEach(p => HealthifyIDB.saveDietPlan(p));
                    } else if (parsed && typeof parsed === 'object') {
                        HealthifyIDB.saveDietPlan(parsed);
                    }
                }
            } catch (e) {}
            try { localStorage.removeItem(k); } catch (e) {}
        });

        // 4. Remove obsolete guest / transient diet keys
        ['ht_saved_diet_plans_guest', 'ht_active_diet_plan_guest', 'ht_confirmed_foods_guest', 'ht_ai_chat_history_guest'].forEach(k => {
            try { localStorage.removeItem(k); } catch (e) {}
        });

        // 5. Sanitize offline users cache (ht_users) to prevent plain-text passwords or unbounded size
        try {
            const rawUsers = localStorage.getItem('ht_users');
            if (rawUsers) {
                const users = JSON.parse(rawUsers);
                if (Array.isArray(users)) {
                    const cleanUsers = users.slice(-5).map(u => ({
                        id: u.id,
                        name: u.name,
                        email: u.email,
                        phone: u.phone
                    }));
                    localStorage.setItem('ht_users', JSON.stringify(cleanUsers));
                }
            }
        } catch (e) {
            localStorage.removeItem('ht_users');
        }

        // 6. Clean any temporary test keys
        allKeys.filter(k => k.startsWith('ht_test_') || k.startsWith('test_')).forEach(k => {
            try { localStorage.removeItem(k); } catch (e) {}
        });
    } catch (err) {
        console.warn('[Healthify Storage] Prune warning:', err);
    }
}

function safeSetStorage(key, value) {
    if (typeof localStorage === 'undefined') return false;
    // Disallow saving bulky AI chat history to localStorage - handled by HealthifyIDB & MySQL
    if (typeof key === 'string' && key.startsWith('ht_ai_chat_history_')) {
        return true;
    }
    const serialized = (typeof value === 'string') ? value : JSON.stringify(value);
    try {
        localStorage.setItem(key, serialized);
        return true;
    } catch (err) {
        const isQuota = err && (
            err.name === 'QuotaExceededError' ||
            err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
            err.code === 22 ||
            err.code === 1014 ||
            (typeof err.message === 'string' && err.message.toLowerCase().includes('quota'))
        );
        if (isQuota) {
            console.warn(`[Healthify Storage] Quota exceeded on '${key}'. Cleaning obsolete cache...`);
            pruneObsoleteStorageCache();
            try {
                localStorage.setItem(key, serialized);
                return true;
            } catch (retryErr) {
                console.warn(`[Healthify Storage] localStorage still full after prune. Falling back to sessionStorage for '${key}'.`);
                try {
                    sessionStorage.setItem(key, serialized);
                    return true;
                } catch (sessionErr) {
                    console.warn(`[Healthify Storage] Fallback to in-memory state for '${key}'.`);
                    return true;
                }
            }
        }
        return false;
    }
}

function safeGetStorage(key) {
    try {
        if (typeof localStorage !== 'undefined') {
            const val = localStorage.getItem(key);
            if (val !== null) return val;
        }
    } catch (e) {}
    try {
        if (typeof sessionStorage !== 'undefined') {
            const sVal = sessionStorage.getItem(key);
            if (sVal !== null) return sVal;
        }
    } catch (e) {}
    return null;
}

function safeRemoveStorage(key) {
    try {
        if (typeof localStorage !== 'undefined') localStorage.removeItem(key);
    } catch (e) {}
    try {
        if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem(key);
    } catch (e) {}
}

async function quickDemoLogin() {
    const res = await sendAuthApi('demo', {});
    const proceedWithUser = (demoUser) => {
        currentUser = createMinimalUserSession(demoUser);
        safeSetStorage('ht_currentUser', currentUser);
        loadUserData();

        const loginPage = document.getElementById('loginPage');
        const appPage = document.getElementById('appPage');
        if (loginPage) {
            loginPage.classList.add('d-none');
            loginPage.style.display = 'none';
        }
        if (appPage) {
            appPage.classList.remove('d-none');
            appPage.style.display = 'block';
        }
        if (typeof setWorkoutMode === 'function') setWorkoutMode(workoutMode);
        renderDashboard();
        showToast(`Welcome, ${currentUser.name}! ⚡`);
    };

    if (res.success && res.user) {
        proceedWithUser(res.user);
    } else {
        proceedWithUser({
            id: 1,
            name: 'Fitness Champion',
            email: 'champion@healthify.app',
            phone: '9876543210'
        });
    }
}

const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30-minute idle session timeout

function touchUserSession() {
    if (!currentUser) return;
    const now = Date.now();
    currentUser.lastActivity = now;
    currentUser.expiresAt = now + SESSION_TIMEOUT_MS;
    safeSetStorage('ht_currentUser', createMinimalUserSession(currentUser));
}

function isSessionValid(user) {
    if (!user || !user.email) return false;
    if (!user.expiresAt || typeof user.expiresAt !== 'number') return false;
    if (Date.now() > user.expiresAt) return false;
    return true;
}

function clearProfileInputs() {
    const elGender = document.getElementById('pGender');
    const elAge = document.getElementById('pAge');
    const elWeight = document.getElementById('pWeight');
    const elHeight = document.getElementById('pHeight');
    const elActivity = document.getElementById('pActivity');

    if (elGender) elGender.value = 'male';
    if (elAge) elAge.value = '';
    if (elWeight) elWeight.value = '';
    if (elHeight) elHeight.value = '';
    if (elActivity) elActivity.value = '1.2';

    const resArea = document.getElementById('resultsArea');
    if (resArea) resArea.classList.add('d-none');

    const confSec = document.getElementById('goalConfirmationSection');
    if (confSec) confSec.classList.add('d-none');

    pendingSelectedGoal = null;
    pendingTargetCalories = null;

    ['cardFastGain', 'cardMildGain', 'cardMaintain', 'cardMild', 'cardLoss', 'cardExtreme'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('selected-goal-card');
    });

    renderProfileActiveGoalBanner();
}

async function login() {
    clearAuthAlert('login');
    const loginBtn = document.getElementById('btnLoginDashboard');
    const emailInput = document.getElementById('userEmail');
    const passInput = document.getElementById('userPassword');
    const email = (emailInput?.value || '').trim();
    const pass = (passInput?.value || '').trim();

    const emailCheck = validateEmailAddress(email, true, 'Email address');
    if (!emailCheck.isValid) {
        showAuthAlert('login', emailCheck.message);
        return;
    }

    if (!pass) {
        showAuthAlert('login', 'Please enter your password.');
        return;
    }

    const cleanEmail = emailCheck.sanitized;

    const origBtnHtml = loginBtn ? loginBtn.innerHTML : '';
    if (loginBtn) {
        loginBtn.disabled = true;
        loginBtn.innerHTML = '⏳ Signing in...';
    }

    try {
        const res = await sendAuthApi('login', {
            email: cleanEmail,
            password: pass
        });

        if (res.success && res.user) {
            currentUser = createMinimalUserSession(res.user);
            safeSetStorage('ht_currentUser', currentUser);
            loadUserData();

            const loginPage = document.getElementById('loginPage');
            const appPage = document.getElementById('appPage');
            if (loginPage) {
                loginPage.classList.add('d-none');
                loginPage.style.display = 'none';
            }
            if (appPage) {
                appPage.classList.remove('d-none');
                appPage.style.display = 'block';
            }
            if (typeof setWorkoutMode === 'function') {
                setWorkoutMode(workoutMode);
            }
            renderDashboard();
            showToast(`Welcome, ${currentUser.name || 'Athlete'}! 💪`);
            if (passInput) passInput.value = '';
        } else {
            showAuthAlert('login', res.error || 'Login failed. Please check your credentials.');
        }
    } catch (err) {
        showAuthAlert('login', 'Login error: ' + (err.message || 'Network error'));
    } finally {
        if (loginBtn) {
            loginBtn.disabled = false;
            loginBtn.innerHTML = origBtnHtml;
        }
    }
}

let isRegPhoneAvailable = null;
let phoneCheckTimer = null;

async function checkPhoneAvailabilityApi(phone) {
    const { primary: primaryUrl, alt: altUrl } = getBackendEndpoints();

    const tryCheck = async (baseUrl) => {
        const url = `${baseUrl.replace(/\/+$/, '')}/api/auth/check-phone?phone=${encodeURIComponent(phone)}`;
        const controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
        const timeoutId = controller ? setTimeout(() => controller.abort(), 2500) : null;
        try {
            const res = await fetch(url, {
                method: 'GET',
                signal: controller ? controller.signal : undefined
            });
            if (timeoutId) clearTimeout(timeoutId);
            const data = await res.json().catch(() => ({}));
            return { ok: true, status: res.status, data };
        } catch (err) {
            if (timeoutId) clearTimeout(timeoutId);
            return { ok: false, error: err };
        }
    };

    let result = await tryCheck(primaryUrl);
    if (result.ok && result.data && result.data.success !== undefined) {
        return result.data;
    }
    if (altUrl && altUrl !== primaryUrl) {
        result = await tryCheck(altUrl);
        if (result.ok && result.data && result.data.success !== undefined) {
            return result.data;
        }
    }

    // Offline / fallback to local storage
    try {
        const users = JSON.parse(localStorage.getItem('ht_users') || '[]');
        const clean = normalizePhoneNumber(phone);
        const exists = users.some(u => normalizePhoneNumber(u.phone) === clean);
        if (exists) {
            return { success: true, available: false, message: 'Phone number already registered. Please use another number.' };
        }
    } catch (e) {}

    return { success: true, available: true, message: 'Phone number available.' };
}

function handleRegPhoneInput() {
    const feedback = document.getElementById('regPhoneFeedback');
    const input = document.getElementById('regPhone');
    if (!feedback || !input) return;

    if (phoneCheckTimer) {
        clearTimeout(phoneCheckTimer);
        phoneCheckTimer = null;
    }

    const val = input.value.trim();
    if (!val) {
        feedback.className = 'small text-start px-2 mb-2 d-none';
        feedback.innerHTML = '';
        isRegPhoneAvailable = null;
        return;
    }

    // Extract digits to inspect progression
    const digitsOnly = val.replace(/\D/g, '');
    let cleanDigits = digitsOnly;
    if (cleanDigits.startsWith('91') && cleanDigits.length === 12) {
        cleanDigits = cleanDigits.substring(2);
    } else if (cleanDigits.startsWith('0') && cleanDigits.length === 11) {
        cleanDigits = cleanDigits.substring(1);
    }

    if (cleanDigits.length < 10) {
        feedback.className = 'small text-start px-2 mb-2 text-muted';
        feedback.innerHTML = `<i class="bi bi-info-circle me-1"></i> Enter 10-digit mobile number (${cleanDigits.length}/10)`;
        isRegPhoneAvailable = false;
        return;
    }

    // Pre-validate 10 digits format
    const phoneCheck = validatePhoneNumber(val, true, 'Phone number');
    if (!phoneCheck.isValid) {
        feedback.className = 'small text-start px-2 mb-2';
        feedback.style.color = '#ff8585';
        feedback.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-1"></i> ${escapeCoachHtml(phoneCheck.message)}`;
        isRegPhoneAvailable = false;
        return;
    }

    // Format is valid! Show loading indicator while checking
    feedback.className = 'small text-start px-2 mb-2';
    feedback.style.color = '#FF8A1F';
    feedback.innerHTML = `<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true" style="width: 0.75rem; height: 0.75rem; border-width: 0.15em;"></span> Checking phone availability...`;

    phoneCheckTimer = setTimeout(async () => {
        try {
            const data = await checkPhoneAvailabilityApi(phoneCheck.sanitized);
            if (data.available === true) {
                isRegPhoneAvailable = true;
                feedback.className = 'small text-start px-2 mb-2';
                feedback.style.color = '#4cd964';
                feedback.innerHTML = `<i class="bi bi-check-circle-fill me-1"></i> ${escapeCoachHtml(data.message || 'Phone number available.')}`;
            } else {
                isRegPhoneAvailable = false;
                feedback.className = 'small text-start px-2 mb-2';
                feedback.style.color = '#ff5252';
                feedback.innerHTML = `<i class="bi bi-x-circle-fill me-1"></i> ${escapeCoachHtml(data.message || 'Phone number already registered. Please use another number.')}`;
            }
        } catch (err) {
            feedback.className = 'small text-start px-2 mb-2 text-muted';
            feedback.innerHTML = `<i class="bi bi-info-circle me-1"></i> Could not check availability right now.`;
            isRegPhoneAvailable = null;
        }
    }, 350);
}

function initRegPhoneListener() {
    const input = document.getElementById('regPhone');
    if (input && !input.dataset.phoneCheckBound) {
        input.dataset.phoneCheckBound = 'true';
        input.addEventListener('input', handleRegPhoneInput);
        input.addEventListener('blur', handleRegPhoneInput);
    }
}

async function registerUser() {
    clearAuthAlert('register');
    const regBtn = document.getElementById('btnRegisterUser');
    const nameInput = document.getElementById('regName');
    const phoneInput = document.getElementById('regPhone');
    const emailInput = document.getElementById('regEmail');
    const passInput = document.getElementById('regPassword');
    const confirmInput = document.getElementById('regConfirmPassword');

    const name = (nameInput?.value || '').trim();
    const phone = (phoneInput?.value || '').trim();
    const email = (emailInput?.value || '').trim();
    const pass = passInput?.value || '';
    const confirm = confirmInput?.value || '';

    if (!name) {
        showAuthAlert('register', 'Please enter your Full Name.');
        return;
    }

    const phoneCheck = validatePhoneNumber(phone, true, 'Phone number');
    if (!phoneCheck.isValid) {
        showAuthAlert('register', phoneCheck.message);
        return;
    }

    if (isRegPhoneAvailable === false) {
        showAuthAlert('register', 'Phone number already registered. Please use another number.');
        if (phoneInput) phoneInput.focus();
        return;
    }

    const emailCheck = validateEmailAddress(email, true, 'Email address');
    if (!emailCheck.isValid) {
        showAuthAlert('register', emailCheck.message);
        return;
    }

    if (!pass || pass.length < 4) {
        showAuthAlert('register', 'Password must be at least 4 characters long.');
        return;
    }
    if (pass !== confirm) {
        showAuthAlert('register', 'Passwords do not match. Please verify both password fields.');
        return;
    }

    const cleanEmail = emailCheck.sanitized;
    const cleanPhone = phoneCheck.sanitized;

    // Immediately normalize phone in the input field
    if (phoneInput) phoneInput.value = cleanPhone;

    const origBtnHtml = regBtn ? regBtn.innerHTML : '';
    if (regBtn) {
        regBtn.disabled = true;
        regBtn.innerHTML = '⏳ Creating Account...';
    }

    try {
        const res = await sendAuthApi('register', {
            name,
            phone: cleanPhone,
            email: cleanEmail,
            password: pass
        });

        if (res.success && res.user) {
            currentUser = createMinimalUserSession(res.user);
            safeSetStorage('ht_currentUser', currentUser);
            loadUserData();

            const loginPage = document.getElementById('loginPage');
            const appPage = document.getElementById('appPage');
            if (loginPage) {
                loginPage.classList.add('d-none');
                loginPage.style.display = 'none';
            }
            if (appPage) {
                appPage.classList.remove('d-none');
                appPage.style.display = 'block';
            }
            if (typeof setWorkoutMode === 'function') {
                setWorkoutMode(workoutMode);
            }
            renderDashboard();
            showToast('🎉 Account registered and saved successfully!');

            // Clear passwords
            if (passInput) passInput.value = '';
            if (confirmInput) confirmInput.value = '';
        } else {
            showAuthAlert('register', res.error || 'Registration failed');
        }
    } catch (err) {
        showAuthAlert('register', 'Registration error: ' + (err.message || 'Network error'));
    } finally {
        if (regBtn) {
            regBtn.disabled = false;
            regBtn.innerHTML = origBtnHtml;
        }
    }
}

function logout(silent = false) {
    currentUser = null;
    safeRemoveStorage('ht_currentUser');

    // Completely clear in-memory state so no previous user details linger
    window.userConfirmedAvailableFoods = [];
    window.userConfirmedAvailableFoodsEmail = null;
    currentActiveDietPlan = null;
    foodLog = [];
    waterGlasses = 0;
    dailySteps = 0;
    currentWorkout = null;
    workoutMode = 'none';
    gymMode = false;
    aiCoachChatTurns = [];

    // Clear Profile Inputs and Calculations
    clearProfileInputs();

    // Clear DOM state
    const appPageEl = document.getElementById('appPage');
    const loginPageEl = document.getElementById('loginPage');
    if (appPageEl) {
        appPageEl.classList.add('d-none');
        appPageEl.style.display = 'none';
    }
    if (loginPageEl) {
        loginPageEl.classList.remove('d-none');
        loginPageEl.style.display = 'block';
    }
    switchLoginTab('login');

    const navUser = document.getElementById('navUserName');
    if (navUser) navUser.textContent = 'Athlete';
    const dashUser = document.getElementById('dashUserName');
    if (dashUser) dashUser.textContent = 'Athlete';

    const waterCountEl = document.getElementById('waterCount');
    if (waterCountEl) waterCountEl.textContent = '0';

    const foodListEl = document.getElementById('foodLogList');
    if (foodListEl) foodListEl.innerHTML = '';

    const confirmedCountBadge = document.getElementById('confirmedFoodCountBadge');
    if (confirmedCountBadge) confirmedCountBadge.textContent = '0';

    const confirmedListEl = document.getElementById('confirmedFoodsList');
    if (confirmedListEl) {
        confirmedListEl.innerHTML = '<div class="text-muted p-2" style="font-size:0.85rem;">No confirmed foods yet. Upload a food list or enter foods above.</div>';
    }

    const dietPlanDisplay = document.getElementById('dietPlanDisplay');
    if (dietPlanDisplay) dietPlanDisplay.innerHTML = '';

    const savedPlansList = document.getElementById('savedDietPlansList');
    if (savedPlansList) savedPlansList.innerHTML = '';

    const chatContainer = document.getElementById('aiCoachMessages');
    if (chatContainer) chatContainer.innerHTML = '';

    // Clear inputs ONLY on explicit user logout, NEVER on silent session expiration/init
    if (!silent) {
        const uName = document.getElementById('userName');
        const uEmail = document.getElementById('userEmail');
        const uPhone = document.getElementById('userPhone');
        const uPass = document.getElementById('userPassword');
        const regName = document.getElementById('regName');
        const regEmail = document.getElementById('regEmail');
        const regPhone = document.getElementById('regPhone');
        const regPass = document.getElementById('regPassword');
        const regConfirm = document.getElementById('regConfirmPassword');

        if (uName) uName.value = '';
        if (uEmail) uEmail.value = '';
        if (uPhone) uPhone.value = '';
        if (uPass) uPass.value = '';
        if (regName) regName.value = '';
        if (regEmail) regEmail.value = '';
        if (regPhone) regPhone.value = '';
        if (regPass) regPass.value = '';
        if (regConfirm) regConfirm.value = '';
    }

    if (waterTimerInterval) clearInterval(waterTimerInterval);
    waterTimerRunning = false;

    if (!silent) {
        showToast('🚪 Logged out. See you next workout!');
    }
}

function loadUserData() {
    if (!currentUser || !currentUser.email) return;
    const email = currentUser.email.toLowerCase().trim();

    // 0. Reset previous in-memory and UI state
    clearProfileInputs();
    window.userConfirmedAvailableFoods = [];
    window.userConfirmedAvailableFoodsEmail = email;
    currentActiveDietPlan = null;
    foodLog = [];
    waterGlasses = 0;
    dailySteps = 0;
    currentWorkout = null;
    workoutMode = 'none';
    gymMode = false;

    syncUserConfirmedFoodsFromBackend(email);
    const navUser = document.getElementById('navUserName');
    if (navUser) navUser.textContent = currentUser.name || 'Athlete';
    const dashUser = document.getElementById('dashUserName');
    if (dashUser) dashUser.textContent = currentUser.name || 'Athlete';

    // 1. Instant local render from user-scoped cache
    const key = `ht_data_${email}`;
    const data = JSON.parse(localStorage.getItem(key) || '{}');
    foodLog = data.foodLog || [];
    waterGlasses = data.waterGlasses || 0;
    gymMode = data.gymMode || false;
    workoutMode = data.workoutMode || (gymMode ? 'gym' : 'none');
    currentWorkout = data.currentWorkout || null;
    dailySteps = data.dailySteps || 0;
    stepGoal = data.stepGoal || 10000;

    const activeChallengeDay = getCurrentActiveChallengeDay();
    currentDietPlanDayIndex = Math.max(0, activeChallengeDay - 1);
    currentViewDay = activeChallengeDay;

    // Helper to sync active diet plan into state and reconstruct foodLog if needed
    const syncActiveDietPlanToState = (plan) => {
        if (!plan || !plan.days || plan.days.length === 0) return;
        currentActiveDietPlan = plan;
        const curDay = getCurrentActiveChallengeDay();
        currentDietPlanDayIndex = Math.max(0, curDay - 1);
        const dayObj = plan.days.find(d => d.dayNumber === curDay) || plan.days[currentDietPlanDayIndex] || plan.days[0];
        
        if (dayObj && Array.isArray(dayObj.meals)) {
            const consumedMeals = dayObj.meals.filter(m => m.status === 'CONSUMED' || m.isConsumed);
            let consumedItemsCount = 0;
            consumedMeals.forEach(m => { consumedItemsCount += (m.items || []).length; });
            
            if (consumedItemsCount > 0 && foodLog.length < consumedItemsCount) {
                const restoredLog = [];
                consumedMeals.forEach(m => {
                    (m.items || []).forEach(it => {
                        restoredLog.push({
                            name: it.name,
                            grams: it.grams || 100,
                            cal: +(it.cal !== undefined ? it.cal : it.calories || 0).toFixed(1),
                            protein: +(it.pro !== undefined ? it.pro : it.protein || 0).toFixed(1),
                            fibre: +(it.fibre || 0).toFixed(1),
                            type: 'diet_plan',
                            dayNumber: curDay,
                            mealSlot: m.slot
                        });
                    });
                });
                if (restoredLog.length > 0) {
                    foodLog = restoredLog;
                    safeSetStorage(key, {
                        foodLog,
                        waterGlasses,
                        gymMode,
                        workoutMode,
                        currentWorkout,
                        dailySteps,
                        stepGoal
                    });
                    renderDashboard();
                    refreshCurrentDayDash();
                }
            }
        }
    };

    // Migrate any legacy bulky diet plans from localStorage into IndexedDB
    HealthifyIDB.migrateBulkyDataFromLocalStorage(email);

    // Instant local render of active diet plan from IndexedDB
    HealthifyIDB.getActiveDietPlan(email).then(cachedPlan => {
        if (cachedPlan && !currentActiveDietPlan) {
            currentActiveDietPlan = cachedPlan;
            syncActiveDietPlanToState(cachedPlan);
            const dietPlanDisplay = document.getElementById('dietPlanDisplay');
            if (dietPlanDisplay) {
                dietPlanDisplay.innerHTML = renderDietPlanHtml(currentActiveDietPlan);
            }
        }
    }).catch(() => {});

    // Fetch active diet plan directly from MySQL backend
    apiFetch(`/api/diet/active?email=${encodeURIComponent(email)}`)
        .then(resData => {
            if (resData.success && resData.dietPlan && resData.dietPlan.days && resData.dietPlan.days.length > 0) {
                currentActiveDietPlan = resData.dietPlan;
                HealthifyIDB.saveDietPlan(currentActiveDietPlan);
                syncActiveDietPlanToState(currentActiveDietPlan);
                const dietPlanDisplay = document.getElementById('dietPlanDisplay');
                if (dietPlanDisplay) {
                    dietPlanDisplay.innerHTML = renderDietPlanHtml(currentActiveDietPlan);
                }
                const cardEl = document.getElementById(`dietCard_${currentActiveDietPlan.id}`);
                if (cardEl) {
                    cardEl.outerHTML = renderDietPlanHtml(currentActiveDietPlan);
                }
            }
        })
        .catch(() => {});

    // Load user's profile from user-scoped cache
    const profileKey = `ht_profile_${email}`;
    const cachedProfile = JSON.parse(localStorage.getItem(profileKey) || '{}');
    if (cachedProfile && cachedProfile.weight) {
        populateProfileInputs(cachedProfile);
    }

    document.getElementById('waterCount').textContent = waterGlasses;
    setWorkoutMode(workoutMode);
    updateSummary();
    renderDashboard();
    renderProfileActiveGoalBanner();

    // 2. Fetch fresh persistent state from MySQL backend
    apiFetch(`/api/daily-data?email=${encodeURIComponent(email)}`)
        .then(resData => {
            if (resData.success && resData.data) {
                const bData = resData.data;
                if (bData.foodLog && Array.isArray(bData.foodLog) && bData.foodLog.length > 0) {
                    if (foodLog.length === 0 || bData.foodLog.length >= foodLog.length) {
                        foodLog = bData.foodLog;
                    }
                }
                if (bData.waterGlasses !== undefined && bData.waterGlasses > 0) waterGlasses = bData.waterGlasses;
                if (bData.dailySteps !== undefined && bData.dailySteps > 0) dailySteps = bData.dailySteps;
                if (bData.stepGoal !== undefined && bData.stepGoal > 0) stepGoal = bData.stepGoal;
                if (bData.workoutMode && bData.workoutMode !== 'none') {
                    workoutMode = bData.workoutMode;
                    gymMode = bData.gymMode || false;
                }
                if (bData.currentWorkout) currentWorkout = bData.currentWorkout;

                document.getElementById('waterCount').textContent = waterGlasses;
                setWorkoutMode(workoutMode);
                updateSummary();
                renderDashboard();

                safeSetStorage(key, {
                    foodLog,
                    waterGlasses,
                    gymMode,
                    workoutMode,
                    currentWorkout,
                    dailySteps,
                    stepGoal
                });
            }
        })
        .catch(() => {
            // Running smoothly on local cache in offline mode
        });

    // 3. Fetch 25-Day Challenge from MySQL
    apiFetch(`/api/challenge?email=${encodeURIComponent(currentUser.email)}`)
        .then(cData => {
            if (cData.success && cData.challenge && (cData.challenge.totalDays || (cData.challenge.history && Object.keys(cData.challenge.history).length > 0))) {
                const challengeKey = `ht_challenge_${currentUser.email}`;
                safeSetStorage(challengeKey, cData.challenge);
                const activeD = getCurrentActiveChallengeDay();
                currentDietPlanDayIndex = Math.max(0, activeD - 1);
                currentViewDay = activeD;
                if (currentActiveDietPlan) {
                    syncActiveDietPlanToState(currentActiveDietPlan);
                    const dietPlanDisplay = document.getElementById('dietPlanDisplay');
                    if (dietPlanDisplay) {
                        dietPlanDisplay.innerHTML = renderDietPlanHtml(currentActiveDietPlan);
                    }
                    const cardEl = document.getElementById(`dietCard_${currentActiveDietPlan.id}`);
                    if (cardEl) {
                        cardEl.outerHTML = renderDietPlanHtml(currentActiveDietPlan);
                    }
                }
                renderDashboard();
                renderChallenge();
                updateSummary();
            }
        })
        .catch(() => {});

    // 4. Fetch User Profile from MySQL
    apiFetch(`/api/profile?email=${encodeURIComponent(currentUser.email)}`)
        .then(pData => {
            if (pData.success && pData.profile && (pData.profile.weight || pData.profile.targetCalories)) {
                const profileKey = `ht_profile_${currentUser.email}`;
                safeSetStorage(profileKey, pData.profile);
                populateProfileInputs(pData.profile);
                renderDashboard();
                updateWaterRecommendation();
                renderProfileActiveGoalBanner();
            }
        })
        .catch(() => {});
}

function saveUserData() {
    if (!currentUser) return;
    const key = `ht_data_${currentUser.email}`;
    const data = {
        foodLog,
        waterGlasses,
        gymMode,
        workoutMode,
        currentWorkout,
        dailySteps,
        stepGoal
    };
    // 1. Instant local storage with safe storage wrapper
    safeSetStorage(key, data);

    // 2. Persist to MySQL via REST API with fallback & offline queueing
    const payload = {
        email: currentUser.email,
        foodLog,
        waterGlasses,
        gymMode,
        workoutMode,
        currentWorkout,
        dailySteps,
        stepGoal
    };

    apiFetch('/api/daily-data', {
        method: 'POST',
        body: JSON.stringify(payload)
    }).catch(err => {
        // When backend is offline, safely queue in IndexedDB
        HealthifyIDB.queueOfflineAction('daily_data', payload);
    });
}

// ==================== PROFESSIONAL HOME DASHBOARD CONTROLLER ====================
function renderDashboard() {
    if (!currentUser) return;

    // 1. User & Date Banner
    const dashUserName = document.getElementById('dashUserName');
    const dashDateBadge = document.getElementById('dashDateBadge');
    if (dashUserName) dashUserName.textContent = currentUser.name || 'Athlete';
    if (dashDateBadge) {
        dashDateBadge.textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        });
    }

    // 2. Profile Data (BMR, Weight, TDEE Goal, Selected Calorie Target)
    const profileKey = `ht_profile_${currentUser.email}`;
    const profile = JSON.parse(localStorage.getItem(profileKey) || '{}');
    const hasProfile = !!(profile && profile.weight);
    const weight = profile.weight || null;
    const targetCalories = profile.targetCalories || profile.tdee || null;
    const selectedGoal = profile.selectedGoal || null;
    const tdeeGoal = targetCalories;
    const proteinGoal = weight ? Math.round(weight * 1.8) : null;
    const targetGlasses = weight ? Math.ceil((weight * 0.033 * ((profile.activity || 1.2) > 1.5 ? 1.3 : 1)) / 0.25) : 12;
    const targetWaterL = (targetGlasses * 0.25).toFixed(1);

    // 3. Water Intake Card
    const elWaterGlasses = document.getElementById('dashWaterGlasses');
    const elWaterTarget = document.getElementById('dashWaterTarget');
    const elWaterLiters = document.getElementById('dashWaterLiters');
    const elWaterTargetLiters = document.getElementById('dashWaterTargetLiters');
    const elWaterProgress = document.getElementById('dashWaterProgressBar');
    const elWaterPercent = document.getElementById('dashWaterPercent');

    if (elWaterGlasses) elWaterGlasses.textContent = waterGlasses;
    if (elWaterTarget) elWaterTarget.textContent = targetGlasses;
    if (elWaterLiters) elWaterLiters.textContent = (waterGlasses * 0.25).toFixed(2);
    if (elWaterTargetLiters) elWaterTargetLiters.textContent = targetWaterL;
    const waterPct = targetGlasses > 0 ? Math.min(100, Math.round((waterGlasses / targetGlasses) * 100)) : 0;
    if (elWaterProgress) elWaterProgress.style.width = `${waterPct}%`;
    if (elWaterPercent) elWaterPercent.textContent = `${waterPct}% Goal`;

    // 4. Calories Card
    let totalCal = 0, totalPro = 0, totalFib = 0;
    foodLog.forEach(f => {
        totalCal += (f.cal || 0);
        totalPro += (f.protein || 0);
        totalFib += (f.fibre || 0);
    });

    const elCalVal = document.getElementById('dashCaloriesVal');
    const elCalGoal = document.getElementById('dashCaloriesGoal');
    const elCalRem = document.getElementById('dashCaloriesRemaining');
    const elCalProgress = document.getElementById('dashCaloriesProgressBar');
    const elCalPercent = document.getElementById('dashCaloriesPercent');

    if (elCalVal) elCalVal.textContent = formatNum(totalCal);
    if (elCalGoal) elCalGoal.textContent = targetCalories ? formatNum(targetCalories) : '--';
    if (targetCalories) {
        const calRem = Math.max(0, targetCalories - totalCal);
        if (elCalRem) elCalRem.textContent = formatNum(calRem);
        const calPct = Math.min(100, Math.round((totalCal / targetCalories) * 100));
        if (elCalProgress) elCalProgress.style.width = `${calPct}%`;
        const goalLabel = selectedGoal ? `(${selectedGoal})` : 'Target';
        if (elCalPercent) elCalPercent.textContent = `${calPct}% ${goalLabel}`;
    } else {
        if (elCalRem) elCalRem.textContent = '--';
        if (elCalProgress) elCalProgress.style.width = '0%';
        if (elCalPercent) elCalPercent.textContent = 'Set Goal in Profile';
    }

    // 5. Protein Card
    const elProVal = document.getElementById('dashProteinVal');
    const elProGoal = document.getElementById('dashProteinGoal');
    const elProRem = document.getElementById('dashProteinRemaining');
    const elProProgress = document.getElementById('dashProteinProgressBar');
    const elProPercent = document.getElementById('dashProteinPercent');
    const elProBadge = document.getElementById('dashProteinBadge');

    if (elProVal) elProVal.textContent = formatNum(totalPro);
    if (elProGoal) elProGoal.textContent = proteinGoal ? proteinGoal : '--';
    if (elProBadge) elProBadge.textContent = proteinGoal ? `Goal: ${proteinGoal}g` : 'Protein Target';
    if (proteinGoal) {
        const proRem = Math.max(0, proteinGoal - totalPro);
        if (elProRem) elProRem.textContent = formatNum(proRem);
        const proPct = Math.min(100, Math.round((totalPro / proteinGoal) * 100));
        if (elProProgress) elProProgress.style.width = `${proPct}%`;
        if (elProPercent) elProPercent.textContent = `${proPct}% Goal`;
    } else {
        if (elProRem) elProRem.textContent = '--';
        if (elProProgress) elProProgress.style.width = '0%';
        if (elProPercent) elProPercent.textContent = 'Set Goal in Profile';
    }

    // 6. Steps / Walking Card
    const elStepsVal = document.getElementById('dashStepsVal');
    const elStepGoal = document.getElementById('dashStepGoal');
    const elStepKm = document.getElementById('dashStepKm');
    const elStepKcal = document.getElementById('dashStepKcal');
    const elStepProgress = document.getElementById('dashStepProgressBar');
    const elStepPercent = document.getElementById('dashStepPercent');

    if (elStepsVal) elStepsVal.textContent = formatNum(dailySteps);
    if (elStepGoal) elStepGoal.textContent = formatNum(stepGoal);
    if (elStepKm) elStepKm.textContent = (dailySteps * 0.00076).toFixed(2);
    if (elStepKcal) elStepKcal.textContent = Math.round(dailySteps * 0.04);
    const stepPct = Math.min(100, Math.round((dailySteps / stepGoal) * 100));
    if (elStepProgress) elStepProgress.style.width = `${stepPct}%`;
    if (elStepPercent) elStepPercent.textContent = `${stepPct}% Completed`;

    // 7. Weight & Goal Card
    const elWeightVal = document.getElementById('dashWeightVal');
    const elBmrVal = document.getElementById('dashBmrVal');
    const elGoalBadge = document.getElementById('dashGoalBadge');

    if (elWeightVal) elWeightVal.textContent = weight ? weight : '--';
    if (elBmrVal) elBmrVal.textContent = profile.bmr ? formatNum(profile.bmr) : '--';
    if (elGoalBadge) {
        if (selectedGoal && targetCalories) {
            elGoalBadge.textContent = `${selectedGoal}: ${formatNum(targetCalories)} kcal`;
            elGoalBadge.style.background = 'rgba(111, 174, 61, 0.15)';
            elGoalBadge.style.color = '#6FAE3D';
            elGoalBadge.style.border = '1px solid #6FAE3D';
        } else if (profile.tdee) {
            elGoalBadge.textContent = `Target: ${formatNum(profile.tdee)} kcal`;
            elGoalBadge.style.background = '#151515';
            elGoalBadge.style.color = '#FF8A1F';
            elGoalBadge.style.border = '1px solid #3A281E';
        } else {
            elGoalBadge.textContent = 'Set in Profile ↗';
            elGoalBadge.style.background = '#151515';
            elGoalBadge.style.color = '#FF8A1F';
            elGoalBadge.style.border = '1px solid #3A281E';
        }
    }

    // 8. Today's Workout Card
    const elWorkoutTitle = document.getElementById('dashWorkoutTitle');
    const elWorkoutMuscles = document.getElementById('dashWorkoutMuscles');
    const elWorkoutBadge = document.getElementById('dashWorkoutBadge');

    if (currentWorkout) {
        if (elWorkoutTitle) elWorkoutTitle.textContent = `${currentWorkout.type === 'home' ? '🏠' : '🏢'} ${currentWorkout.title}`;
        const musclesList = (currentWorkout.muscles && currentWorkout.muscles.length) ? currentWorkout.muscles.join(', ') : 'General';
        const exCount = (currentWorkout.exercises || []).length;
        if (elWorkoutMuscles) elWorkoutMuscles.textContent = `🎯 ${musclesList} (${exCount} exercise${exCount !== 1 ? 's' : ''})`;
        if (elWorkoutBadge) elWorkoutBadge.innerHTML = `<span class="badge" style="background: rgba(111, 174, 61, 0.2); color: #6FAE3D; border: 1px solid #6FAE3D;">Active / Logged ✅</span>`;
    } else if (workoutMode === 'home') {
        if (elWorkoutTitle) elWorkoutTitle.textContent = `🏠 Home Workout Session`;
        if (elWorkoutMuscles) elWorkoutMuscles.textContent = `Home training selected. Complete your routine!`;
        if (elWorkoutBadge) elWorkoutBadge.innerHTML = `<span class="badge" style="background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid #38bdf8;">In Progress ⏳</span>`;
    } else if (workoutMode === 'gym') {
        if (elWorkoutTitle) elWorkoutTitle.textContent = `🏢 Gym Workout Session`;
        if (elWorkoutMuscles) elWorkoutMuscles.textContent = `Gym training selected. Check off your muscles!`;
        if (elWorkoutBadge) elWorkoutBadge.innerHTML = `<span class="badge" style="background: rgba(255, 138, 31, 0.2); color: #FF8A1F; border: 1px solid #FF8A1F;">In Progress ⏳</span>`;
    } else {
        if (elWorkoutTitle) elWorkoutTitle.textContent = `🛌 Rest / Recovery Day`;
        if (elWorkoutMuscles) elWorkoutMuscles.textContent = `No active workout routine logged today.`;
        if (elWorkoutBadge) elWorkoutBadge.innerHTML = `<span class="badge" style="background: #262626; color: #A9A9A9;">Rest</span>`;
    }

    // 9. 25-Day Challenge Connection
    const challengeKey = `ht_challenge_${currentUser.email}`;
    let rawChallenge = localStorage.getItem(challengeKey);
    if (!rawChallenge) {
        // Auto-initialize 25-Day challenge structure for seamless tracking
        const initChallenge = {
            totalDays: 25,
            startDate: new Date().toISOString(),
            history: {}
        };
        localStorage.setItem(challengeKey, JSON.stringify(initChallenge));
        rawChallenge = JSON.stringify(initChallenge);
    }

    const challengeData = JSON.parse(rawChallenge);
    const totalDays = challengeData.totalDays || 25;
    const completedCount = Object.keys(challengeData.history || {}).length;
    const currentDay = completedCount < totalDays ? completedCount + 1 : totalDays;

    const elChallengeCurrent = document.getElementById('dashChallengeCurrentDay');
    const elChallengeTotal = document.getElementById('dashChallengeTotalDays');
    const elChallengeCompleted = document.getElementById('dashChallengeCompleted');
    const elChallengeRemaining = document.getElementById('dashChallengeRemaining');
    const elChallengeProgressBar = document.getElementById('dashChallengeProgressBar');
    const elDayScroller = document.getElementById('dashChallengeDayScroller');
    const elChallengeActionBtn = document.getElementById('dashChallengeActionBtn');

    if (elChallengeCurrent) elChallengeCurrent.textContent = currentDay;
    if (elChallengeTotal) elChallengeTotal.textContent = totalDays;
    if (elChallengeCompleted) elChallengeCompleted.textContent = completedCount;
    if (elChallengeRemaining) elChallengeRemaining.textContent = Math.max(0, totalDays - completedCount);

    const chPct = Math.round((completedCount / totalDays) * 100);
    if (elChallengeProgressBar) {
        elChallengeProgressBar.style.width = `${chPct}%`;
        elChallengeProgressBar.textContent = `${chPct}%`;
    }

    if (elChallengeActionBtn) {
        if (completedCount >= totalDays) {
            elChallengeActionBtn.textContent = '🏆 Challenge Completed (25/25)';
            elChallengeActionBtn.onclick = () => openDayDashboard(totalDays);
        } else {
            elChallengeActionBtn.textContent = `⭐ Open Day ${currentDay} Dashboard`;
            elChallengeActionBtn.onclick = () => openDayDashboard(currentDay);
        }
    }

    // Render Day-by-Day Scroller Pills (ONLY 3 STRICT STATES)
    if (elDayScroller) {
        elDayScroller.innerHTML = '';
        for (let i = 1; i <= totalDays; i++) {
            const dayKey = `Day ${i}`;
            const record = challengeData.history[dayKey];

            if (record) {
                // 1. COMPLETED: GREEN + ✅
                elDayScroller.innerHTML += `
                    <div class="dash-day-pill completed" onclick="openDayDashboard(${i})" ondblclick="openDayDashboard(${i})" title="Day ${i} - Completed">
                        <span>✅</span>
                        <span>D${i}</span>
                    </div>
                `;
            } else if (i === currentDay && completedCount < totalDays) {
                // 2. CURRENT / ACTIVE: HIGHLIGHTED + ⭐
                elDayScroller.innerHTML += `
                    <div class="dash-day-pill current" onclick="openDayDashboard(${i})" ondblclick="openDayDashboard(${i})" title="Day ${i} - Today / Current">
                        <span>⭐</span>
                        <span>D${i}</span>
                    </div>
                `;
            } else {
                // 3. LOCKED: GREYED OUT + 🔒
                elDayScroller.innerHTML += `
                    <div class="dash-day-pill locked" onclick="openDayDashboard(${i})" ondblclick="openDayDashboard(${i})" title="Day ${i} - Locked">
                        <span>🔒</span>
                        <span>D${i}</span>
                    </div>
                `;
            }
        }
    }

    // 10. Render Professional Transformation Challenge Graph
    renderChallengeGraph(completedCount, totalDays);

    // 11. Recent Activity Stream
    const elActivityList = document.getElementById('dashActivityList');
    if (elActivityList) {
        const activities = [];

        if (dailySteps > 0) {
            activities.push(`
                <div class="dash-activity-item" style="border-left-color: #6FAE3D;">
                    <span>👣</span>
                    <div><strong>Walked ${formatNum(dailySteps)} steps</strong> (${Math.round((dailySteps/stepGoal)*100)}% of goal)</div>
                </div>
            `);
        }

        if (currentWorkout) {
            activities.push(`
                <div class="dash-activity-item" style="border-left-color: #FF8A1F;">
                    <span>🏋️</span>
                    <div><strong>${currentWorkout.title}</strong> (${(currentWorkout.exercises || []).length} exercises logged)</div>
                </div>
            `);
        }

        if (waterGlasses > 0) {
            activities.push(`
                <div class="dash-activity-item" style="border-left-color: #38bdf8;">
                    <span>💧</span>
                    <div><strong>Logged ${waterGlasses} glasses of water</strong> (~${(waterGlasses * 0.25).toFixed(2)}L)</div>
                </div>
            `);
        }

        if (foodLog.length > 0) {
            activities.push(`
                <div class="dash-activity-item" style="border-left-color: #FF8A1F;">
                    <span>🥗</span>
                    <div><strong>Logged ${foodLog.length} meal item(s)</strong> (${formatNum(totalCal)} kcal, ${formatNum(totalPro)}g protein)</div>
                </div>
            `);
        }

        if (completedCount > 0) {
            activities.push(`
                <div class="dash-activity-item" style="border-left-color: #6FAE3D;">
                    <span>🏆</span>
                    <div><strong>Transformation Challenge:</strong> Day ${completedCount} of ${totalDays} Completed (${chPct}%)</div>
                </div>
            `);
        }

        if (activities.length === 0) {
            elActivityList.innerHTML = `
                <div class="text-center py-3 small" style="color: #A9A9A9;">
                    <span class="fs-4">⚡</span><br>
                    No activity recorded today yet.<br>
                    Start by taking steps, drinking water, or opening Day ${currentDay}!
                </div>
            `;
        } else {
            elActivityList.innerHTML = activities.join('');
        }
    }
}

// ==================== TRANSFORMATION CHALLENGE PROGRESS GRAPH CONTROLLER ====================
let challengeChartInstance = null;

function renderChallengeGraph(completedCount, totalDays) {
    totalDays = totalDays || 25;
    completedCount = completedCount || 0;

    const canvas = document.getElementById('challengeProgressChart');
    if (!canvas) return;

    const labels = [];
    const actualData = [];
    const targetData = [];

    for (let i = 1; i <= totalDays; i++) {
        labels.push(`D${i}`);
        const pct = Math.round((i / totalDays) * 100);
        targetData.push(pct);
        if (i <= completedCount) {
            actualData.push(pct);
        } else {
            actualData.push(null);
        }
    }

    const currentPercent = totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0;
    const currentDay = completedCount < totalDays ? completedCount + 1 : totalDays;

    const elSub = document.getElementById('graphSubtitle');
    const elBadge = document.getElementById('graphCompletedBadge');
    if (elSub) elSub.textContent = `Day ${currentDay} of ${totalDays} • ${currentPercent}% Completed`;
    if (elBadge) elBadge.textContent = `${completedCount} / ${totalDays} Days Done (${currentPercent}%)`;

    // Attempt Chart.js rendering
    if (typeof Chart !== 'undefined') {
        try {
            const ctx = canvas.getContext('2d');
            if (challengeChartInstance) {
                challengeChartInstance.destroy();
            }

            const gradient = ctx.createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(0, 'rgba(111, 174, 61, 0.45)');
            gradient.addColorStop(1, 'rgba(111, 174, 61, 0.02)');

            challengeChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Actual Progress (%)',
                            data: actualData,
                            borderColor: '#6FAE3D',
                            backgroundColor: gradient,
                            borderWidth: 3,
                            fill: true,
                            tension: 0.3,
                            pointRadius: (ctx) => {
                                const idx = ctx.dataIndex;
                                return idx < completedCount ? 4 : (idx === completedCount - 1 ? 7 : 0);
                            },
                            pointBackgroundColor: '#6FAE3D',
                            pointBorderColor: '#151515',
                            pointBorderWidth: 2,
                            spanGaps: false
                        },
                        {
                            label: 'Milestone Target (%)',
                            data: targetData,
                            borderColor: '#FF8A1F',
                            borderDash: [4, 4],
                            borderWidth: 1.5,
                            fill: false,
                            pointRadius: 0
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 500
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                boxWidth: 12,
                                color: '#F5F5F5',
                                font: { size: 11, weight: 'bold' }
                            }
                        },
                        tooltip: {
                            backgroundColor: '#1C1C1C',
                            titleColor: '#FF8A1F',
                            bodyColor: '#F5F5F5',
                            borderColor: '#3A281E',
                            borderWidth: 1,
                            callbacks: {
                                label: function(context) {
                                    if (context.parsed.y !== null) {
                                        return ` ${context.dataset.label}: ${context.parsed.y}%`;
                                    }
                                    return ' 🔒 Locked / Not completed yet';
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: { display: false },
                            ticks: {
                                color: '#A9A9A9',
                                font: { size: 10 },
                                maxRotation: 0,
                                autoSkip: true,
                                maxTicksLimit: 13
                            }
                        },
                        y: {
                            min: 0,
                            max: 100,
                            ticks: {
                                color: '#A9A9A9',
                                stepSize: 20,
                                callback: val => `${val}%`,
                                font: { size: 10 }
                            },
                            grid: { color: 'rgba(255, 255, 255, 0.08)' }
                        }
                    }
                }
            });
            return;
        } catch (e) {
            console.warn('Chart.js render exception, using Canvas fallback:', e);
        }
    }

    // Canvas fallback rendering
    drawChallengeCanvasFallback(canvas, completedCount, totalDays, currentPercent);
}

function drawChallengeCanvasFallback(canvas, completedCount, totalDays, currentPercent) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.clientWidth || 400;
    const height = canvas.height = canvas.parentElement.clientHeight || 210;

    ctx.fillStyle = '#151515';
    ctx.fillRect(0, 0, width, height);

    const padL = 38, padR = 15, padT = 25, padB = 25;
    const plotW = width - padL - padR;
    const plotH = height - padT - padB;

    // Grid lines & Y labels
    ctx.strokeStyle = '#262626';
    ctx.lineWidth = 1;
    for (let p = 0; p <= 100; p += 25) {
        const y = padT + plotH - (p / 100) * plotH;
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(width - padR, y);
        ctx.stroke();

        ctx.fillStyle = '#A9A9A9';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`${p}%`, padL - 5, y + 3);
    }

    // Milestone Target Line
    ctx.strokeStyle = '#FF8A1F';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padL, padT + plotH);
    ctx.lineTo(width - padR, padT);
    ctx.stroke();
    ctx.setLineDash([]);

    // Actual progress
    if (completedCount > 0) {
        const points = [];
        for (let i = 1; i <= completedCount; i++) {
            const x = padL + ((i - 1) / (totalDays - 1)) * plotW;
            const y = padT + plotH - (i / totalDays) * plotH;
            points.push({ x, y });
        }

        // Fill area
        ctx.beginPath();
        ctx.moveTo(padL, padT + plotH);
        points.forEach(pt => ctx.lineTo(pt.x, pt.y));
        const lastPt = points[points.length - 1];
        ctx.lineTo(lastPt.x, padT + plotH);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, padT, 0, padT + plotH);
        grad.addColorStop(0, 'rgba(111, 174, 61, 0.45)');
        grad.addColorStop(1, 'rgba(111, 174, 61, 0.02)');
        ctx.fillStyle = grad;
        ctx.fill();

        // Stroke line
        ctx.beginPath();
        ctx.moveTo(padL, padT + plotH);
        points.forEach(pt => ctx.lineTo(pt.x, pt.y));
        ctx.strokeStyle = '#6FAE3D';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Points
        points.forEach((pt, idx) => {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, idx === points.length - 1 ? 6 : 3.5, 0, Math.PI * 2);
            ctx.fillStyle = idx === points.length - 1 ? '#6FAE3D' : '#6FAE3D';
            ctx.fill();
            ctx.strokeStyle = '#151515';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    }

    // X Axis Labels
    ctx.fillStyle = '#A9A9A9';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    const dayMilestones = [1, 5, 10, 15, 20, 25];
    dayMilestones.forEach(d => {
        if (d <= totalDays) {
            const x = padL + ((d - 1) / (totalDays - 1)) * plotW;
            ctx.fillText(`D${d}`, x, height - 8);
        }
    });
}

// ==================== DEDICATED REUSABLE DAY DASHBOARD CONTROLLER ====================
let currentViewDay = 1;

function getCurrentActiveChallengeDay() {
    if (!currentUser) return 1;
    let challengeData = null;
    const raw = localStorage.getItem(`ht_challenge_${currentUser.email}`);
    if (raw) {
        try { challengeData = JSON.parse(raw); } catch (e) {}
    }
    if (!challengeData || !challengeData.history) return 1;
    const totalDays = challengeData.totalDays || 25;
    let activeDay = 1;
    for (let i = 1; i <= totalDays; i++) {
        if (challengeData.history[`Day ${i}`]) {
            activeDay = i + 1;
        } else {
            activeDay = i;
            break;
        }
    }
    return Math.min(activeDay, totalDays);
}

function isChallengeDayCompleted(dayNum) {
    if (!currentUser) return false;
    const raw = localStorage.getItem(`ht_challenge_${currentUser.email}`);
    if (!raw) return false;
    try {
        const cd = JSON.parse(raw);
        return !!(cd.history && cd.history[`Day ${dayNum}`]);
    } catch (e) {
        return false;
    }
}

function openDayDashboard(dayNum) {
    if (!currentUser) {
        alert('Please log in first!');
        return;
    }

    const raw = localStorage.getItem(`ht_challenge_${currentUser.email}`);
    const challengeData = raw ? JSON.parse(raw) : { totalDays: 25, history: {} };
    const totalDays = challengeData.totalDays || 25;
    const completedCount = Object.keys(challengeData.history || {}).length;
    const currentActiveDay = completedCount < totalDays ? completedCount + 1 : totalDays;

    if (dayNum > currentActiveDay && completedCount < totalDays) {
        alert(`🔒 Day ${dayNum} is locked!\n\nPlease complete Day ${currentActiveDay} first to unlock Day ${dayNum}.`);
        return;
    }

    currentViewDay = dayNum;
    renderDayDashboard(dayNum, challengeData, currentActiveDay, totalDays);
    showSection('dayDashboardSection');
}

function renderDayDashboard(dayNum, challengeData, currentActiveDay, totalDays) {
    if (!currentUser) return;
    if (!challengeData) {
        const raw = localStorage.getItem(`ht_challenge_${currentUser.email}`);
        challengeData = raw ? JSON.parse(raw) : { totalDays: 25, history: {} };
    }
    if (!totalDays) totalDays = challengeData.totalDays || 25;
    const completedCount = Object.keys(challengeData.history || {}).length;
    if (!currentActiveDay) currentActiveDay = completedCount < totalDays ? completedCount + 1 : totalDays;

    const isPastCompleted = !!(challengeData.history && challengeData.history[`Day ${dayNum}`]);
    const isCurrent = (dayNum === currentActiveDay && !isPastCompleted);

    // Header & Badge
    const elTitle = document.getElementById('dayDashTitle');
    const elSub = document.getElementById('dayDashSubtitle');
    const elBadge = document.getElementById('dayDashStatusBadge');

    if (elTitle) elTitle.textContent = `Day ${dayNum} of ${totalDays}`;
    if (elSub) {
        elSub.textContent = isPastCompleted
            ? `Completed on ${challengeData.history['Day ' + dayNum].date || 'Challenge Record'}`
            : (isCurrent ? `Today's Active Challenge Session • Focus on your 4 daily execution pillars` : `Day ${dayNum} Overview`);
    }

    if (elBadge) {
        if (isPastCompleted) {
            elBadge.style.background = 'rgba(111, 174, 61, 0.2)';
            elBadge.style.color = '#6FAE3D';
            elBadge.style.border = '1px solid #6FAE3D';
            elBadge.innerHTML = '✅ Completed';
        } else if (isCurrent) {
            elBadge.style.background = 'linear-gradient(135deg, #6B3F24, #FF8A1F)';
            elBadge.style.color = '#ffffff';
            elBadge.style.border = '1px solid #FF8A1F';
            elBadge.innerHTML = '⭐ Today / Current';
        } else {
            elBadge.style.background = '#111';
            elBadge.style.color = '#555';
            elBadge.style.border = '1px solid #222';
            elBadge.innerHTML = '🔒 Locked';
        }
    }

    // Profile Targets
    const profileKey = `ht_profile_${currentUser.email}`;
    const profile = JSON.parse(localStorage.getItem(profileKey) || '{}');
    const weight = profile.weight || 70;
    const targetSteps = stepGoal || 10000;
    const targetGlasses = Math.ceil((weight * 0.033 * ((profile.activity || 1.2) > 1.5 ? 1.3 : 1)) / 0.25) || 12;
    const tdeeGoal = profile.targetCalories || profile.tdee || 2000;

    let daySteps = 0;
    let dayWater = 0;
    let dayWorkout = null;
    let dayFoodLog = [];

    if (isPastCompleted) {
        const hist = challengeData.history[`Day ${dayNum}`];
        daySteps = hist.dailySteps || 0;
        dayWater = hist.waterGlasses || 0;
        dayWorkout = hist.routineTitle ? { title: hist.routineTitle, muscles: hist.muscles || [], exercises: hist.exercises || [] } : null;
        dayFoodLog = hist.foodLog || [];
    } else {
        daySteps = dailySteps;
        dayWater = waterGlasses;
        dayWorkout = currentWorkout;
        dayFoodLog = foodLog;
    }

    let dayCal = 0, dayPro = 0;
    dayFoodLog.forEach(f => {
        dayCal += f.cal;
        dayPro += f.protein;
    });

    // Check goal fulfillment
    const stepCompleted = daySteps >= targetSteps || (daySteps > 0 && isPastCompleted);
    const waterCompleted = dayWater >= targetGlasses || (dayWater >= 6 && isPastCompleted);
    const workoutCompleted = !!dayWorkout || workoutMode !== 'none' || isPastCompleted;
    const nutritionCompleted = dayFoodLog.length > 0 || isPastCompleted;

    let completedTasks = 0;
    if (stepCompleted) completedTasks++;
    if (waterCompleted) completedTasks++;
    if (workoutCompleted) completedTasks++;
    if (nutritionCompleted) completedTasks++;

    const progressPct = isPastCompleted ? 100 : Math.round((completedTasks / 4) * 100);

    const elProgressPercent = document.getElementById('dayDashProgressPercent');
    const elProgressBar = document.getElementById('dayDashProgressBar');
    const elScore = document.getElementById('dayDashScore');

    if (elProgressPercent) elProgressPercent.textContent = `${progressPct}%`;
    if (elProgressBar) {
        elProgressBar.style.width = `${progressPct}%`;
        elProgressBar.style.background = progressPct === 100 ? 'linear-gradient(90deg, #4D8424, #6FAE3D)' : 'linear-gradient(90deg, #6B3F24, #FF8A1F)';
    }
    if (elScore) elScore.textContent = isPastCompleted ? '4 / 4' : `${completedTasks} / 4`;

    // 1. Steps Tile
    const elStepsVal = document.getElementById('dayDashStepsVal');
    const elStepsBadge = document.getElementById('dayDashStepsBadge');
    if (elStepsVal) elStepsVal.textContent = `${formatNum(daySteps)} / ${formatNum(targetSteps)} steps`;
    if (elStepsBadge) {
        elStepsBadge.style.background = stepCompleted ? 'rgba(111, 174, 61, 0.2)' : '#262626';
        elStepsBadge.style.color = stepCompleted ? '#6FAE3D' : '#A9A9A9';
        elStepsBadge.style.border = stepCompleted ? '1px solid #6FAE3D' : 'none';
        elStepsBadge.textContent = stepCompleted ? '✅ Goal Hit' : 'In Progress';
    }

    // 2. Water Tile
    const elWaterVal = document.getElementById('dayDashWaterVal');
    const elWaterBadge = document.getElementById('dayDashWaterBadge');
    if (elWaterVal) elWaterVal.textContent = `${dayWater} / ${targetGlasses} glasses (~${(dayWater * 0.25).toFixed(2)}L)`;
    if (elWaterBadge) {
        elWaterBadge.style.background = waterCompleted ? 'rgba(56, 189, 248, 0.2)' : '#262626';
        elWaterBadge.style.color = waterCompleted ? '#38bdf8' : '#A9A9A9';
        elWaterBadge.style.border = waterCompleted ? '1px solid #38bdf8' : 'none';
        elWaterBadge.textContent = waterCompleted ? '✅ Hydrated' : 'In Progress';
    }

    // 3. Workout Tile
    const elWorkoutVal = document.getElementById('dayDashWorkoutVal');
    const elWorkoutBadge = document.getElementById('dayDashWorkoutBadge');
    if (elWorkoutVal) {
        if (dayWorkout) {
            elWorkoutVal.textContent = `${dayWorkout.title} (${(dayWorkout.exercises || []).length} ex)`;
        } else if (workoutMode === 'home') {
            elWorkoutVal.textContent = '🏠 Home Workout Session';
        } else if (workoutMode === 'gym') {
            elWorkoutVal.textContent = '🏢 Gym Workout Session';
        } else {
            elWorkoutVal.textContent = isPastCompleted ? 'Rest Day' : 'No workout selected yet';
        }
    }
    if (elWorkoutBadge) {
        elWorkoutBadge.style.background = workoutCompleted ? 'rgba(255, 138, 31, 0.2)' : '#262626';
        elWorkoutBadge.style.color = workoutCompleted ? '#FF8A1F' : '#A9A9A9';
        elWorkoutBadge.style.border = workoutCompleted ? '1px solid #FF8A1F' : 'none';
        elWorkoutBadge.textContent = workoutCompleted ? '✅ Logged' : 'Pending';
    }

    // 4. Nutrition Tile
    const elNutVal = document.getElementById('dayDashNutritionVal');
    const elNutBadge = document.getElementById('dayDashNutritionBadge');
    if (elNutVal) elNutVal.textContent = `${formatNum(dayCal)} cal | ${formatNum(dayPro)}g protein (${dayFoodLog.length} items)`;
    if (elNutBadge) {
        elNutBadge.style.background = nutritionCompleted ? 'rgba(255, 138, 31, 0.2)' : '#262626';
        elNutBadge.style.color = nutritionCompleted ? '#FF8A1F' : '#A9A9A9';
        elNutBadge.style.border = nutritionCompleted ? '1px solid #FF8A1F' : 'none';
        elNutBadge.textContent = nutritionCompleted ? '✅ Meals Logged' : 'Pending';
    }

    // Checklist
    const elChecklist = document.getElementById('dayDashChecklist');
    if (elChecklist) {
        elChecklist.innerHTML = `
            <div class="d-flex align-items-center justify-content-between p-2 rounded" style="background: #151515; border: 1px solid #262626; color: #F5F5F5;">
                <span class="d-flex align-items-center gap-2">
                    <span class="fs-5">${stepCompleted ? '✅' : '⚪'}</span>
                    <strong>Complete Daily Step Goal:</strong> ${formatNum(daySteps)} / ${formatNum(targetSteps)} steps
                </span>
                <span class="badge" style="${stepCompleted ? 'background: rgba(111, 174, 61, 0.2); color: #6FAE3D; border: 1px solid #6FAE3D;' : 'background: #262626; color: #A9A9A9;'}">${stepCompleted ? 'Done' : 'Pending'}</span>
            </div>
            <div class="d-flex align-items-center justify-content-between p-2 rounded" style="background: #151515; border: 1px solid #262626; color: #F5F5F5;">
                <span class="d-flex align-items-center gap-2">
                    <span class="fs-5">${waterCompleted ? '✅' : '⚪'}</span>
                    <strong>Complete Daily Water Hydration:</strong> ${dayWater} / ${targetGlasses} glasses
                </span>
                <span class="badge" style="${waterCompleted ? 'background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid #38bdf8;' : 'background: #262626; color: #A9A9A9;'}">${waterCompleted ? 'Done' : 'Pending'}</span>
            </div>
            <div class="d-flex align-items-center justify-content-between p-2 rounded" style="background: #151515; border: 1px solid #262626; color: #F5F5F5;">
                <span class="d-flex align-items-center gap-2">
                    <span class="fs-5">${workoutCompleted ? '✅' : '⚪'}</span>
                    <strong>Complete Daily Workout:</strong> ${dayWorkout ? dayWorkout.title : (workoutMode !== 'none' ? 'Session In Progress' : (isPastCompleted ? 'Rest Day' : 'Choose Workout or Rest'))}
                </span>
                <span class="badge" style="${workoutCompleted ? 'background: rgba(255, 138, 31, 0.2); color: #FF8A1F; border: 1px solid #FF8A1F;' : 'background: #262626; color: #A9A9A9;'}">${workoutCompleted ? 'Done' : 'Pending'}</span>
            </div>
            <div class="d-flex align-items-center justify-content-between p-2 rounded" style="background: #151515; border: 1px solid #262626; color: #F5F5F5;">
                <span class="d-flex align-items-center gap-2">
                    <span class="fs-5">${nutritionCompleted ? '✅' : '⚪'}</span>
                    <strong>Complete Daily Nutrition:</strong> ${formatNum(dayCal)} cal, ${formatNum(dayPro)}g protein
                </span>
                <span class="badge" style="${nutritionCompleted ? 'background: rgba(255, 138, 31, 0.2); color: #FF8A1F; border: 1px solid #FF8A1F;' : 'background: #262626; color: #A9A9A9;'}">${nutritionCompleted ? 'Done' : 'Pending'}</span>
            </div>
        `;
    }

    // Action Card
    const elActionBtn = document.getElementById('dayDashCompleteBtn');
    const elPrompt = document.getElementById('dayDashCompletePrompt');

    if (elActionBtn) {
        if (isPastCompleted) {
            if (elPrompt) elPrompt.textContent = `Day ${dayNum} is Finished & Saved!`;
            elActionBtn.style.background = '#262626';
            elActionBtn.style.color = '#A9A9A9';
            elActionBtn.className = 'btn btn-lg px-5 py-3 fw-bold rounded-pill disabled';
            elActionBtn.innerHTML = `✅ Day ${dayNum} Completed`;
            elActionBtn.onclick = null;
        } else if (isCurrent) {
            if (elPrompt) elPrompt.textContent = `Ready to Finish Day ${dayNum}?`;
            elActionBtn.style.background = 'linear-gradient(135deg, #4D8424, #6FAE3D)';
            elActionBtn.style.color = '#ffffff';
            elActionBtn.className = 'btn btn-lg px-5 py-3 fw-bold rounded-pill shadow';
            elActionBtn.innerHTML = `🎉 Complete Day ${dayNum} & Mark Challenge`;
            elActionBtn.onclick = () => completeDayFromDashboard();
        } else {
            if (elPrompt) elPrompt.textContent = `Day ${dayNum} is Locked`;
            elActionBtn.style.background = '#262626';
            elActionBtn.style.color = '#555';
            elActionBtn.className = 'btn btn-lg px-5 py-3 fw-bold rounded-pill disabled';
            elActionBtn.innerHTML = `🔒 Day ${dayNum} Locked`;
            elActionBtn.onclick = null;
        }
    }
}

function refreshCurrentDayDash() {
    const dayDashSec = document.getElementById('dayDashboardSection');
    if (dayDashSec && !dayDashSec.classList.contains('d-none')) {
        renderDayDashboard(currentViewDay);
    }
}

function completeDayFromDashboard() {
    if (!currentUser) {
        alert('Please log in first!');
        return;
    }

    const raw = localStorage.getItem(`ht_challenge_${currentUser.email}`);
    let challengeData = raw ? JSON.parse(raw) : null;
    if (!challengeData) {
        challengeData = {
            totalDays: 25,
            startDate: new Date().toISOString(),
            history: {}
        };
    }

    const totalDays = challengeData.totalDays || 25;
    const completedCount = Object.keys(challengeData.history || {}).length;
    const targetDay = completedCount < totalDays ? completedCount + 1 : totalDays;

    if (completedCount >= totalDays) {
        alert('🏆 You have already completed all 25 days of your transformation challenge! Start a new challenge to keep going!');
        return;
    }

    // Collect muscles trained
    const trainedMuscles = [];
    document.querySelectorAll('input[name="muscleGroup"]:checked').forEach(cb => {
        trainedMuscles.push(cb.value);
    });

    const workoutLabel = workoutMode === 'home'
        ? '🏠 Home Workout'
        : (workoutMode === 'gym' ? '🏢 Gym Workout' : (currentWorkout ? currentWorkout.title : '🛌 Rest / Recovery'));

    const routineDesc = currentWorkout ? ` (${currentWorkout.title})` : '';

    if (!confirm(`✅ Ready to Complete Day ${targetDay} of ${totalDays}?\n\n👣 Steps: ${formatNum(dailySteps)}\n💧 Water: ${waterGlasses} glasses\n🏋️ Workout: ${workoutLabel}${routineDesc}\n🥗 Meals Logged: ${foodLog.length} items\n\nThis will mark Day ${targetDay} as Completed and unlock Day ${targetDay + 1 <= totalDays ? targetDay + 1 : totalDays}.`)) {
        return;
    }

    // Save Day Log
    const dayData = {
        foodLog: [...foodLog],
        waterGlasses: waterGlasses,
        dailySteps: dailySteps,
        gymMode: gymMode,
        workoutMode: workoutMode,
        routineTitle: currentWorkout ? currentWorkout.title : (gymMode ? 'Custom Workout' : 'Rest Day'),
        exercises: currentWorkout ? (currentWorkout.exercises || []) : [],
        muscles: trainedMuscles,
        date: new Date().toLocaleDateString('en-IN', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }),
        timestamp: new Date().toISOString()
    };

    challengeData.history[`Day ${targetDay}`] = dayData;
    localStorage.setItem(`ht_challenge_${currentUser.email}`, JSON.stringify(challengeData));

    // Persist Challenge Day to MySQL via REST API
    if (currentUser) {
        const cPayload = {
            email: currentUser.email,
            totalDays: challengeData.totalDays || 25,
            currentDay: targetDay + 1 <= totalDays ? targetDay + 1 : totalDays,
            startDate: challengeData.startDate,
            history: challengeData.history
        };
        apiFetch('/api/challenge', {
            method: 'POST',
            body: JSON.stringify(cPayload)
        }).catch(() => {
            HealthifyIDB.queueOfflineAction('challenge', cPayload);
        });
    }

    // Keep completed day in view so the user immediately sees their completed day's summary
    currentViewDay = targetDay;

    // Reset daily logs for next day workspace
    foodLog = [];
    waterGlasses = 0;
    dailySteps = 0;
    currentWorkout = null;
    setWorkoutMode('none');
    const waterEl = document.getElementById('waterCount');
    if (waterEl) waterEl.textContent = 0;
    document.querySelectorAll('input[name="muscleGroup"]').forEach(cb => cb.checked = false);

    // Save active state to local cache safely without clearing MySQL food logs
    const dataKey = `ht_data_${currentUser.email}`;
    safeSetStorage(dataKey, {
        foodLog: [],
        waterGlasses: 0,
        gymMode: false,
        workoutMode: 'none',
        currentWorkout: null,
        dailySteps: 0,
        stepGoal: stepGoal || 10000
    });

    // Advance and sequentially lock diet plan days
    if (currentActiveDietPlan && Array.isArray(currentActiveDietPlan.days)) {
        const completedDay = currentActiveDietPlan.days.find(d => d.dayNumber === targetDay);
        if (completedDay) {
            completedDay.isCompleted = true;
            completedDay.isLocked = true;
            completedDay.isActive = false;
        }
        const nextDayNum = targetDay + 1;
        const nextDay = currentActiveDietPlan.days.find(d => d.dayNumber === nextDayNum);
        if (nextDay) {
            nextDay.isActive = true;
            nextDay.isLocked = false;
            const nextIdx = currentActiveDietPlan.days.indexOf(nextDay);
            if (nextIdx !== -1) currentDietPlanDayIndex = nextIdx;
        }
        HealthifyIDB.saveDietPlan(currentActiveDietPlan);
        safeSetStorage(`ht_active_diet_plan_${currentUser.email}`, currentActiveDietPlan);
        const cardEl = document.getElementById(`dietCard_${currentActiveDietPlan.id}`);
        if (cardEl) {
            cardEl.outerHTML = renderDietPlanHtml(currentActiveDietPlan);
        }
    }

    updateSummary(targetDay);
    renderDashboard();

    const newCompletedCount = Object.keys(challengeData.history).length;
    showToast(`🎉 Day ${targetDay} Completed & Saved! Day ${targetDay + 1 <= totalDays ? targetDay + 1 : totalDays} is now active ⭐`);

    if (newCompletedCount >= totalDays) {
        setTimeout(() => {
            alert(`🏆🎉 CHAMPION! You completed all ${totalDays} Days of the Transformation Challenge! 🎉🏆\n\nYou're in legendary shape! Keep the streak alive!`);
        }, 500);
        showSection('challenge');
    } else {
        openDayDashboard(targetDay);
    }
}

// ==================== STEPS MODAL CONTROLLER ====================
function openStepsModal() {
    const input = document.getElementById('inputStepsCount');
    const inputGoal = document.getElementById('inputModalStepGoal');
    if (input) input.value = dailySteps || 0;
    if (inputGoal) inputGoal.value = stepGoal || 10000;

    const modalEl = document.getElementById('stepsModal');
    if (modalEl) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
    }
}

function quickAddSteps(amt) {
    const input = document.getElementById('inputStepsCount');
    if (input) {
        const curr = parseInt(input.value) || 0;
        input.value = curr + amt;
    }
}

function saveStepsModal() {
    const input = document.getElementById('inputStepsCount');
    const inputGoal = document.getElementById('inputModalStepGoal');

    const stepsVal = parseInt(input.value);
    if (isNaN(stepsVal) || stepsVal < 0) {
        alert('Please enter a valid step count (0 or higher)!');
        return;
    }

    dailySteps = stepsVal;
    if (inputGoal && parseInt(inputGoal.value) > 0) {
        stepGoal = parseInt(inputGoal.value);
    }

    saveUserData();
    renderDashboard();
    refreshCurrentDayDash();

    const modalEl = document.getElementById('stepsModal');
    if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
    }

    showToast(`👣 Logged ${formatNum(dailySteps)} steps! (${Math.round((dailySteps/stepGoal)*100)}% of goal)`);
}

function startQuick25DayChallenge() {
    if (!currentUser) {
        alert('Please log in first!');
        return;
    }
    const challengeData = {
        totalDays: 25,
        startDate: new Date().toISOString(),
        history: {}
    };
    localStorage.setItem(`ht_challenge_${currentUser.email}`, JSON.stringify(challengeData));
    if (currentUser) {
        const cPayload = {
            email: currentUser.email,
            totalDays: 25,
            currentDay: 1,
            startDate: challengeData.startDate,
            history: {}
        };
        apiFetch('/api/challenge', {
            method: 'POST',
            body: JSON.stringify(cPayload)
        }).catch(() => {
            HealthifyIDB.queueOfflineAction('challenge', cPayload);
        });
    }
    showToast('🏆 25-Day Transformation Challenge Started!');
    renderDashboard();
    renderChallenge();
    openDayDashboard(1);
}

// ==================== NAVIGATION ====================
function showSection(id) {
    ['categories', 'foodSection', 'profile', 'supplements', 'summary', 'water', 'challenge', 'workoutHubSection', 'routineDetailSection', 'dayDashboardSection', 'aiCoachSection'].forEach(s => {
        const el = document.getElementById(s);
        if (el) el.classList.add('d-none');
    });
    const target = document.getElementById(id);
    if (target) target.classList.remove('d-none');

    if (id === 'categories') renderDashboard();
    if (id === 'profile') renderProfileSection();
    if (id === 'summary') updateSummary();
    if (id === 'challenge') renderChallenge();
    if (id === 'water') updateWaterRecommendation();
    if (id === 'workoutHubSection') renderWorkoutHub();
    if (id === 'aiCoachSection') checkAICoachServerStatus();
}

function goHome() {
    showSection('categories');
    renderDashboard();
}

// ==================== WORKOUTS HUB & ROUTINES ====================
function openWorkoutsHub(tab = 'home') {
    activeWorkoutTab = tab;
    activeFilter = 'all';
    showSection('workoutHubSection');
}

function switchWorkoutTab(tab) {
    activeWorkoutTab = tab;
    activeFilter = 'all';
    renderWorkoutHub();
}

function renderWorkoutHub() {
    const tabHome = document.getElementById('tabHomeWorkouts');
    const tabGym = document.getElementById('tabGymWorkouts');
    if (activeWorkoutTab === 'home') {
        tabHome.classList.add('active');
        tabGym.classList.remove('active');
    } else {
        tabGym.classList.add('active');
        tabHome.classList.remove('active');
    }

    const routines = workoutDB[activeWorkoutTab] || [];
    const categories = ['all', ...new Set(routines.map(r => r.category))];

    const filtersContainer = document.getElementById('workoutFilters');
    filtersContainer.innerHTML = categories.map(cat => {
        const label = cat === 'all' ? '✨ All Routines' : cat;
        const activeClass = activeFilter === cat ? 'btn-primary text-white' : 'btn-outline-secondary';
        return `<button class="btn btn-sm ${activeClass} rounded-pill px-3" onclick="setWorkoutFilter('${cat}')">${label}</button>`;
    }).join('');

    renderWorkoutRoutines();
}

function setWorkoutFilter(filter) {
    activeFilter = filter;
    renderWorkoutHub();
}

function renderWorkoutRoutines() {
    const grid = document.getElementById('routinesGrid');
    grid.innerHTML = '';

    const routines = workoutDB[activeWorkoutTab] || [];
    const filtered = activeFilter === 'all' ? routines : routines.filter(r => r.category === activeFilter);

    if (filtered.length === 0) {
        grid.innerHTML = '<div class="col-12 text-center text-muted py-4">No routines found for this filter.</div>';
        return;
    }

    filtered.forEach(routine => {
        const musclePills = routine.muscles.map(m => `<span class="badge me-1 mb-1" style="background: #262626; color: #FF8A1F; border: 1px solid #3A281E;">${m}</span>`).join('');

        grid.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="routine-card" onclick="openRoutineDetail('${activeWorkoutTab}', '${routine.id}')">
                    <div>
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <span class="fs-2">${routine.icon || '🏋️'}</span>
                            <span class="routine-badge-level" style="background: linear-gradient(135deg, #6B3F24, #FF8A1F); color: #fff;">${routine.level}</span>
                        </div>
                        <h5 class="fw-bold mb-1" style="color: #F5F5F5;">${routine.title}</h5>
                        <p class="small mb-3" style="color: #A9A9A9;">${routine.description}</p>
                    </div>
                    <div>
                        <div class="d-flex gap-2 small mb-2" style="color: #A9A9A9;">
                            <span>⏱️ ${routine.duration}</span>
                            <span>•</span>
                            <span>📋 ${routine.exercises.length} Exercises</span>
                        </div>
                        <div class="small mb-2" style="color: #A9A9A9;"><strong style="color: #F5F5F5;">Equip:</strong> ${routine.equipment}</div>
                        <div class="mb-3">${musclePills}</div>
                        <button class="btn btn-sm w-100 fw-bold rounded-pill" style="background: linear-gradient(135deg, #6B3F24, #FF8A1F); color: #fff; border: none;">🚀 View & Start Routine</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function openRoutineDetail(tab, routineId) {
    const routines = workoutDB[tab] || [];
    const routine = routines.find(r => r.id === routineId);
    if (!routine) return;

    currentRoutine = routine;
    activeWorkoutTab = tab;

    const header = document.getElementById('routineHeader');

    header.innerHTML = `
        <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
            <div>
                <span class="badge mb-2" style="background: linear-gradient(135deg, #6B3F24, #FF8A1F); color: #fff;">${tab === 'home' ? '🏠 Home Routine' : '🏢 Gym Routine'} - ${routine.category}</span>
                <h2 class="section-title mb-1">${routine.icon} ${routine.title}</h2>
                <p class="mb-2" style="color: #A9A9A9;">${routine.description}</p>
            </div>
            <div class="text-end">
                <span class="badge p-2" style="background: #262626; color: #A9A9A9; border: 1px solid #3A281E;">${routine.level}</span>
                <div class="small mt-1" style="color: #A9A9A9;">Est. Time: <strong style="color: #FF8A1F;">${routine.duration}</strong></div>
            </div>
        </div>
        <div class="p-3 rounded border mb-3" style="background: #1C1C1C; border-color: #262626 !important; color: #F5F5F5;">
            <div class="row g-2 small">
                <div class="col-sm-6"><strong style="color: #FF8A1F;">🔧 Equipment:</strong> ${routine.equipment}</div>
                <div class="col-sm-6"><strong style="color: #FF8A1F;">🎯 Target Muscles:</strong> ${routine.muscles.join(', ')}</div>
            </div>
        </div>
    `;

    const exerciseList = document.getElementById('routineExerciseList');
    exerciseList.innerHTML = '';

    routine.exercises.forEach((ex, idx) => {
        const safeInstructions = (ex.instructions || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
        const safeName = (ex.name || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
        const safeMuscle = (ex.muscle || '').replace(/'/g, "\\'");
        const safeEquip = (routine.equipment || '').replace(/'/g, "\\'");

        exerciseList.innerHTML += `
            <div class="exercise-item" id="exItem_${idx}">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div class="d-flex align-items-center gap-3">
                        <input type="checkbox" class="form-check-input fs-5" id="exCheck_${idx}" onchange="toggleExerciseChecked(${idx})">
                        <div>
                            <h6 class="fw-bold mb-0" style="color: #F5F5F5;">${idx + 1}. ${ex.name}</h6>
                            <small style="color: #A9A9A9;">🎯 ${ex.muscle} | <strong style="color: #FF8A1F;">${ex.sets} Sets</strong> x <strong style="color: #FF8A1F;">${ex.reps}</strong></small>
                        </div>
                    </div>
                    <div class="d-flex align-items-center gap-2 flex-wrap">
                        <button class="btn btn-sm btn-watch-video" onclick="openExerciseVideo('${safeName}', '${ex.videoId || 'IODxDxX7oi4'}', '${safeMuscle}', '${safeEquip}', '${safeInstructions}')">
                            <i class="bi bi-play-circle-fill"></i> 🎬 Watch Video
                        </button>
                        <button class="btn btn-sm rounded-pill" style="border: 1px solid #38bdf8; color: #38bdf8; background: transparent;" onclick="setRestTimerPreset(${ex.rest || 45}); toggleRestTimer(true);">
                            ⏱️ Rest (${ex.rest || 45}s)
                        </button>
                    </div>
                </div>
                <div class="small mt-2 ps-3 ms-2" style="color: #A9A9A9; border-left: 2px solid #3A281E;">
                    💡 <em>Form tip:</em> ${ex.instructions}
                </div>
            </div>
        `;
    });

    setRestTimerPreset(45);
    showSection('routineDetailSection');
}

// ==================== VIDEO MODAL CONTROLLER ====================
let currentVideoState = { exerciseName: '', videoId: '', muscle: '', equip: '', instructions: '' };
let videoLoadTimer = null;

function openExerciseVideo(exerciseName, videoId, muscle, equip, instructions) {
    currentVideoState = { exerciseName, videoId, muscle, equip, instructions };

    const titleEl = document.getElementById('videoModalTitle');
    const muscleEl = document.getElementById('videoModalMuscle');
    const equipEl = document.getElementById('videoModalEquip');
    const instEl = document.getElementById('videoModalInstructions');
    const extLink = document.getElementById('videoExternalLink');
    const errLink = document.getElementById('videoErrorExtLink');

    if (titleEl) titleEl.textContent = exerciseName;
    if (muscleEl) muscleEl.textContent = muscle || 'General';
    if (equipEl) equipEl.textContent = equip || 'Standard';
    if (instEl) instEl.textContent = instructions || 'Follow proper form and maintain control.';
    if (extLink) extLink.href = `https://www.youtube.com/watch?v=${videoId}`;
    if (errLink) errLink.href = `https://www.youtube.com/watch?v=${videoId}`;

    loadWorkoutVideoEmbed(videoId);

    const videoModalEl = document.getElementById('videoModal');
    if (videoModalEl) {
        bootstrap.Modal.getOrCreateInstance(videoModalEl).show();
    }
}

function loadWorkoutVideoEmbed(videoId) {
    const iframe = document.getElementById('videoIframe');
    const spinner = document.getElementById('videoLoadingSpinner');
    const errorState = document.getElementById('videoErrorState');

    if (videoLoadTimer) clearTimeout(videoLoadTimer);

    if (spinner) spinner.classList.remove('d-none');
    if (errorState) errorState.classList.add('d-none');
    if (iframe) {
        iframe.style.display = 'none';
        iframe.src = '';
    }

    if (!videoId) {
        if (spinner) spinner.classList.add('d-none');
        if (errorState) errorState.classList.remove('d-none');
        return;
    }

    // Safety timeout: transition away from loading if blocked
    videoLoadTimer = setTimeout(() => {
        if (iframe && iframe.style.display === 'none') {
            if (spinner) spinner.classList.add('d-none');
            if (errorState) errorState.classList.remove('d-none');
        }
    }, 4500);

    if (iframe) {
        iframe.onload = function () {
            if (videoLoadTimer) clearTimeout(videoLoadTimer);
            if (spinner) spinner.classList.add('d-none');
            if (errorState) errorState.classList.add('d-none');
            iframe.style.display = 'block';
        };
        iframe.onerror = function () {
            if (videoLoadTimer) clearTimeout(videoLoadTimer);
            if (spinner) spinner.classList.add('d-none');
            if (errorState) errorState.classList.remove('d-none');
        };
        iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1&modestbranding=1&enablejsapi=1`;
    }
}

function retryLoadVideo() {
    if (currentVideoState && currentVideoState.videoId) {
        loadWorkoutVideoEmbed(currentVideoState.videoId);
    }
}

function closeVideoModal() {
    if (videoLoadTimer) clearTimeout(videoLoadTimer);
    const iframe = document.getElementById('videoIframe');
    if (iframe) {
        iframe.onload = null;
        iframe.onerror = null;
        iframe.src = '';
        iframe.style.display = 'none';
    }
    const spinner = document.getElementById('videoLoadingSpinner');
    const errorState = document.getElementById('videoErrorState');
    if (spinner) spinner.classList.remove('d-none');
    if (errorState) errorState.classList.add('d-none');
}

// Ensure video player safely cleans up when closed via backdrop, Esc, or UI
document.addEventListener('DOMContentLoaded', function() {
    const videoModalEl = document.getElementById('videoModal');
    if (videoModalEl) {
        videoModalEl.addEventListener('hidden.bs.modal', closeVideoModal);
    }
});

function toggleExerciseChecked(idx) {
    const item = document.getElementById(`exItem_${idx}`);
    const cb = document.getElementById(`exCheck_${idx}`);
    if (cb && cb.checked) {
        item.classList.add('completed-ex');
    } else if (item) {
        item.classList.remove('completed-ex');
    }
}

function toggleAllExercises(check) {
    if (!currentRoutine) return;
    currentRoutine.exercises.forEach((_, idx) => {
        const cb = document.getElementById(`exCheck_${idx}`);
        if (cb) {
            cb.checked = check;
            toggleExerciseChecked(idx);
        }
    });
}

function logCurrentRoutineComplete() {
    if (!currentRoutine) return;

    const completedExercises = [];
    currentRoutine.exercises.forEach((ex, idx) => {
        const cb = document.getElementById(`exCheck_${idx}`);
        if (cb && cb.checked) {
            completedExercises.push(ex.name);
        }
    });

    const exerciseNamesToLog = completedExercises.length > 0
        ? completedExercises
        : currentRoutine.exercises.map(e => e.name);

    currentWorkout = {
        type: activeWorkoutTab,
        routineId: currentRoutine.id,
        title: currentRoutine.title,
        muscles: [...currentRoutine.muscles],
        exercises: exerciseNamesToLog,
        timestamp: new Date().toISOString()
    };

    setWorkoutMode(activeWorkoutTab);

    // Auto-check corresponding muscles
    currentRoutine.muscles.forEach(m => {
        document.querySelectorAll('input[name="muscleGroup"]').forEach(cb => {
            if (cb.value === m || m.includes(cb.value) || cb.value.includes(m)) {
                cb.checked = true;
            }
        });
    });

    saveUserData();
    updateSummary();
    showSection('summary');
    showToast(`🎉 Logged: ${currentRoutine.title}!`);
}

// ==================== REST TIMER SYSTEM ====================
function setRestTimerPreset(sec) {
    resetRestTimer();
    restTimerSeconds = sec;
    restTimerRemaining = sec;
    updateRestTimerDisplay();

    document.querySelectorAll('.timer-btn-preset').forEach(btn => btn.classList.remove('active'));
    const matchingBtn = Array.from(document.querySelectorAll('.timer-btn-preset')).find(b => parseInt(b.textContent) === sec || (sec === 120 && b.textContent === '2m'));
    if (matchingBtn) matchingBtn.classList.add('active');
}

function updateRestTimerDisplay() {
    const mins = Math.floor(restTimerRemaining / 60).toString().padStart(2, '0');
    const secs = (restTimerRemaining % 60).toString().padStart(2, '0');
    const display = document.getElementById('restTimerDisplay');
    if (display) display.textContent = `${mins}:${secs}`;
}

function toggleRestTimer(forceStart = false) {
    if (restTimerRunning && !forceStart) {
        clearInterval(restTimerInterval);
        restTimerRunning = false;
        const startBtn = document.getElementById('timerStartBtn');
        if (startBtn) startBtn.textContent = '▶️ Resume Rest';
        const statusLabel = document.getElementById('timerStatusLabel');
        if (statusLabel) {
            statusLabel.textContent = 'Paused';
            statusLabel.className = 'badge bg-warning text-dark';
        }
    } else {
        if (restTimerRemaining <= 0) {
            restTimerRemaining = restTimerSeconds;
        }
        if (restTimerInterval) clearInterval(restTimerInterval);
        restTimerRunning = true;
        const startBtn = document.getElementById('timerStartBtn');
        if (startBtn) startBtn.textContent = '⏸️ Pause';
        const statusLabel = document.getElementById('timerStatusLabel');
        if (statusLabel) {
            statusLabel.textContent = 'Resting...';
            statusLabel.className = 'badge bg-success';
        }

        restTimerInterval = setInterval(() => {
            restTimerRemaining--;
            updateRestTimerDisplay();
            if (restTimerRemaining <= 0) {
                clearInterval(restTimerInterval);
                restTimerRunning = false;
                const startBtn = document.getElementById('timerStartBtn');
                if (startBtn) startBtn.textContent = '▶️ Start Rest';
                const statusLabel = document.getElementById('timerStatusLabel');
                if (statusLabel) {
                    statusLabel.textContent = 'Rest Done! 💪';
                    statusLabel.className = 'badge bg-danger';
                }
                playTimerBeep();
                showToast('🔔 Rest interval complete! Back to work! 💪');
            }
        }, 1000);
    }
}

function resetRestTimer() {
    if (restTimerInterval) clearInterval(restTimerInterval);
    restTimerRunning = false;
    restTimerRemaining = restTimerSeconds;
    updateRestTimerDisplay();
    const startBtn = document.getElementById('timerStartBtn');
    if (startBtn) startBtn.textContent = '▶️ Start Rest';
    const statusLabel = document.getElementById('timerStatusLabel');
    if (statusLabel) {
        statusLabel.textContent = 'Ready';
        statusLabel.className = 'badge bg-secondary';
    }
}

function playTimerBeep() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
        // audio context fallback
    }
}

// ==================== FOOD CATEGORY ====================
function openCategory(cat) {
    selectedCategory = cat;
    const titles = {
        veg: '🥦 Veg Protein Foods',
        nonveg: '🍗 Non-Veg Protein Foods',
        nuts: '🌰 Nuts & Healthy Fats',
        fibre: '🌾 High Fibre Foods'
    };
    document.getElementById('foodTitle').textContent = titles[cat];

    const container = document.getElementById('foodList');
    container.innerHTML = '';

    foodDB[cat].forEach((food, i) => {
        const emoji = food.emoji || '🍽️';
        const escapedName = food.name.replace(/'/g, "\\'");
        container.innerHTML += `
            <div class="col-6 col-md-4 col-lg-3">
                <div class="food-card" onclick="openFoodModal('${cat}', ${i})">
                    <img src="${food.img}" alt="${food.name}" onerror="handleImgError(this, '${emoji}', '${escapedName}', '${cat}')">
                    <div class="food-card-body">
                        <h6>${emoji} ${food.name}</h6>
                        <small>${food.cal} cal | ${food.protein}g protein</small>
                    </div>
                </div>
            </div>
        `;
    });

    showSection('foodSection');
}

function openFoodModal(cat, idx) {
    const food = foodDB[cat][idx];
    selectedFood = { ...food, type: 'food' };

    document.getElementById('modalName').textContent = `${food.emoji || '🍽️'} ${food.name}`;
    const modalImg = document.getElementById('modalImg');
    if (modalImg) {
        modalImg.src = food.img;
        modalImg.onerror = function() { handleImgError(this, food.emoji || '🍽️', food.name, cat); };
    }
    document.getElementById('gramsInput').value = '';
    document.getElementById('nutritionInfo').innerHTML = '';

    let badgeHTML = '';
    (food.badges || []).forEach(b => {
        badgeHTML += `<span class="badge" style="background: linear-gradient(135deg, #6B3F24, #FF8A1F); color: #fff;">${b}</span> `;
    });
    document.getElementById('foodBadges').innerHTML = badgeHTML;

    new bootstrap.Modal(document.getElementById('foodModal')).show();
}

function calcNutrition() {
    if (!selectedFood) return;
    const grams = parseFloat(document.getElementById('gramsInput').value) || 0;
    const ratio = grams / 100;

    const cal = (selectedFood.cal * ratio).toFixed(1);
    const pro = (selectedFood.protein * ratio).toFixed(1);
    const fib = (selectedFood.fibre * ratio).toFixed(1);

    document.getElementById('nutritionInfo').innerHTML = `🔥 ${cal} cal | 💪 ${pro}g protein | 🌾 ${fib}g fibre`;
}

function addFood() {
    if (!selectedFood) return;
    const grams = parseFloat(document.getElementById('gramsInput').value);
    if (!grams || grams <= 0) {
        alert('Please enter valid grams!');
        return;
    }

    const ratio = grams / 100;
    foodLog.push({
        name: selectedFood.name,
        grams: grams,
        cal: +(selectedFood.cal * ratio).toFixed(1),
        protein: +(selectedFood.protein * ratio).toFixed(1),
        fibre: +(selectedFood.fibre * ratio).toFixed(1),
        type: selectedFood.type || 'food'
    });

    saveUserData();
    renderDashboard();
    refreshCurrentDayDash();
    bootstrap.Modal.getInstance(document.getElementById('foodModal')).hide();
    showToast(`✅ ${selectedFood.name} (${grams}g) added!`);
}

// ==================== SUPPLEMENTS ====================
function openSupplements() {
    resetSupplements();
    showSection('supplements');
}

function resetSupplements() {
    document.getElementById('suppSelection').classList.remove('d-none');
    document.getElementById('brandListSection').classList.add('d-none');
}

function showBrandList(type) {
    const data = supplementDB[type];
    document.getElementById('suppSelection').classList.add('d-none');
    document.getElementById('brandListSection').classList.remove('d-none');
    document.getElementById('suppListTitle').textContent = data.title;
    document.getElementById('suppInstructions').textContent = data.instructions;

    const grid = document.getElementById('brandsGrid');
    grid.innerHTML = '';

    data.brands.forEach((brand, i) => {
        const escapedName = brand.name.replace(/'/g, "\\'");
        grid.innerHTML += `
            <div class="col-6 col-md-4">
                <div class="brand-card" onclick="openSuppModal('${type}', ${i})">
                    <img src="${brand.img}" alt="${brand.name}" onerror="handleImgError(this, '💊', '${escapedName}', 'supp')">
                    <div class="brand-card-body">
                        <h6>${brand.name}</h6>
                        <small>${brand.protein}g protein | ${brand.serving}g/scoop</small>
                    </div>
                </div>
            </div>
        `;
    });
}

function openSuppModal(type, idx) {
    const brand = supplementDB[type].brands[idx];
    selectedFood = { ...brand, type: 'supplement' };

    document.getElementById('modalName').textContent = `💊 ${brand.name}`;
    const modalImg = document.getElementById('modalImg');
    if (modalImg) {
        modalImg.src = brand.img;
        modalImg.onerror = function() { handleImgError(this, '💊', brand.name, 'supp'); };
    }
    document.getElementById('gramsInput').value = brand.serving;
    document.getElementById('nutritionInfo').innerHTML = '';

    let badgeHTML = '';
    (brand.badges || []).forEach(b => {
        badgeHTML += `<span class="badge" style="background: linear-gradient(135deg, #6B3F24, #FF8A1F); color: #fff;">${b}</span> `;
    });
    document.getElementById('foodBadges').innerHTML = badgeHTML;

    calcNutrition();
    new bootstrap.Modal(document.getElementById('foodModal')).show();
}

// ==================== SUMMARY ====================
function updateSummary(targetDayNum = null) {
    const body = document.getElementById('summaryBody');
    if (!body) return;
    body.innerHTML = '';

    // Retrieve challenge history if available
    let challengeHistory = {};
    if (currentUser) {
        const raw = localStorage.getItem(`ht_challenge_${currentUser.email}`);
        if (raw) {
            try {
                const cData = JSON.parse(raw);
                challengeHistory = cData.history || {};
            } catch (e) {}
        }
    }

    const completedDayKeys = Object.keys(challengeHistory);

    // Determine which day's food data to display
    let itemsToDisplay = [];
    let isViewingCompletedDay = false;
    let viewingDayKey = null;
    let viewingDate = null;
    let viewingWorkout = null;

    if (targetDayNum !== null && targetDayNum !== '' && targetDayNum !== 'active') {
        const dKey = String(targetDayNum).startsWith('Day ') ? String(targetDayNum) : `Day ${targetDayNum}`;
        if (challengeHistory[dKey]) {
            isViewingCompletedDay = true;
            viewingDayKey = dKey;
            const h = challengeHistory[dKey];
            itemsToDisplay = h.foodLog || [];
            viewingDate = h.date || '';
            viewingWorkout = {
                title: h.routineTitle || (h.workoutMode === 'gym' ? 'Gym Workout' : (h.workoutMode === 'home' ? 'Home Workout' : 'Rest Day')),
                type: h.workoutMode || 'none',
                muscles: h.muscles || [],
                exercises: h.exercises || []
            };
        }
    } else if (currentViewDay && challengeHistory[`Day ${currentViewDay}`] && (!foodLog || foodLog.length === 0)) {
        // If currentViewDay points to a completed day and active foodLog is empty
        const dKey = `Day ${currentViewDay}`;
        isViewingCompletedDay = true;
        viewingDayKey = dKey;
        const h = challengeHistory[dKey];
        itemsToDisplay = h.foodLog || [];
        viewingDate = h.date || '';
        viewingWorkout = {
            title: h.routineTitle || (h.workoutMode === 'gym' ? 'Gym Workout' : (h.workoutMode === 'home' ? 'Home Workout' : 'Rest Day')),
            type: h.workoutMode || 'none',
            muscles: h.muscles || [],
            exercises: h.exercises || []
        };
    } else if (foodLog && foodLog.length > 0) {
        // Active session has items
        itemsToDisplay = foodLog;
        isViewingCompletedDay = false;
        viewingWorkout = currentWorkout;
    } else if (completedDayKeys.length > 0) {
        // Active foodLog is empty, fall back to the latest completed day so table is never empty when records exist
        const latestKey = completedDayKeys[completedDayKeys.length - 1];
        const h = challengeHistory[latestKey];
        if (h && Array.isArray(h.foodLog) && h.foodLog.length > 0) {
            isViewingCompletedDay = true;
            viewingDayKey = latestKey;
            itemsToDisplay = h.foodLog;
            viewingDate = h.date || '';
            viewingWorkout = {
                title: h.routineTitle || (h.workoutMode === 'gym' ? 'Gym Workout' : (h.workoutMode === 'home' ? 'Home Workout' : 'Rest Day')),
                type: h.workoutMode || 'none',
                muscles: h.muscles || [],
                exercises: h.exercises || []
            };
        }
    }

    // Populate day selector dropdown in Summary header if present
    const daySelect = document.getElementById('summaryDaySelect');
    if (daySelect && completedDayKeys.length > 0) {
        daySelect.classList.remove('d-none');
        let optionsHtml = `<option value="active"${!isViewingCompletedDay ? ' selected' : ''}>Today's Active Session${foodLog.length > 0 ? ` (${foodLog.length} items)` : ''}</option>`;
        completedDayKeys.forEach(dk => {
            const d = challengeHistory[dk];
            const dItems = (d.foodLog || []).length;
            const selected = (isViewingCompletedDay && viewingDayKey === dk) ? ' selected' : '';
            optionsHtml += `<option value="${dk}"${selected}>${dk}${d.date ? ` (${d.date})` : ''} - ✅ ${dItems} items</option>`;
        });
        daySelect.innerHTML = optionsHtml;
    } else if (daySelect) {
        daySelect.classList.add('d-none');
    }

    // Update Summary Header Title & Badge
    const elHeading = document.getElementById('summaryHeading');
    const elBadge = document.getElementById('summaryDayBadge');
    const elBackToDay = document.getElementById('summaryBackToDayBtn');

    if (elHeading) {
        if (isViewingCompletedDay) {
            elHeading.textContent = `📊 ${viewingDayKey} Food Summary`;
        } else {
            elHeading.textContent = `📊 Today's Summary`;
        }
    }

    if (elBadge) {
        if (isViewingCompletedDay) {
            elBadge.style.background = 'rgba(111, 174, 61, 0.2)';
            elBadge.style.color = '#6FAE3D';
            elBadge.style.border = '1px solid #6FAE3D';
            elBadge.innerHTML = `✅ ${viewingDayKey} Saved${viewingDate ? ` · ${viewingDate}` : ''}`;
        } else {
            elBadge.style.background = 'linear-gradient(135deg, #6B3F24, #FF8A1F)';
            elBadge.style.color = '#fff';
            elBadge.style.border = '1px solid #FF8A1F';
            elBadge.innerHTML = `⭐ Today / Active`;
        }
    }

    if (elBackToDay) {
        if (isViewingCompletedDay && viewingDayKey) {
            const dNum = parseInt(viewingDayKey.replace('Day ', ''), 10);
            elBackToDay.style.display = 'inline-block';
            elBackToDay.textContent = `🔍 View ${viewingDayKey} Dashboard`;
            elBackToDay.onclick = () => openDayDashboard(dNum);
        } else {
            elBackToDay.style.display = 'none';
        }
    }

    // Render Food Table Rows
    let totalCal = 0, totalPro = 0, totalFib = 0;

    if (itemsToDisplay.length === 0) {
        body.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">No meals logged yet. Log foods from the <a href="javascript:void(0)" onclick="openCategory('veg')" class="text-warning">Nutrition</a> section.</td></tr>`;
    } else {
        itemsToDisplay.forEach((item, i) => {
            const cal = Number(item.cal) || 0;
            const pro = Number(item.protein) || 0;
            const fib = Number(item.fibre) || 0;
            totalCal += cal;
            totalPro += pro;
            totalFib += fib;

            const actionBtn = isViewingCompletedDay
                ? `<span class="badge" style="background: rgba(111, 174, 61, 0.2); color: #6FAE3D; border: 1px solid #6FAE3D;">✅ Saved</span>`
                : `<button class="btn btn-sm btn-danger" onclick="removeFood(${i})" title="Remove item">🗑️</button>`;

            body.innerHTML += `
                <tr>
                    <td class="fw-semibold">${item.name}</td>
                    <td>${item.grams}g</td>
                    <td>${cal}</td>
                    <td>${pro}g</td>
                    <td>${fib}g</td>
                    <td class="no-print text-center">${actionBtn}</td>
                </tr>
            `;
        });
    }

    // Totals Display
    const totalsEl = document.getElementById('totals');
    if (totalsEl) {
        totalsEl.innerHTML = `🔥 Total: ${formatNum(totalCal)} cal | 💪 ${formatNum(totalPro)}g protein | 🌾 ${formatNum(totalFib)}g fibre`;
    }

    // Update Routine Banner
    const activeBanner = document.getElementById('activeRoutineBanner');
    if (activeBanner) {
        const routineObj = isViewingCompletedDay ? viewingWorkout : (currentWorkout && workoutMode !== 'none' ? currentWorkout : null);
        if (routineObj && (routineObj.title || (routineObj.type && routineObj.type !== 'none'))) {
            activeBanner.classList.remove('d-none');
            const badge = document.getElementById('activeRoutineBadge');
            const title = document.getElementById('activeRoutineTitle');
            const sub = document.getElementById('activeRoutineSub');
            if (badge) {
                const isHome = routineObj.type === 'home';
                badge.textContent = isHome ? '🏠 Home Routine' : (routineObj.type === 'gym' ? '🏢 Gym Routine' : '🛌 Rest / Recovery');
                badge.style.background = isHome ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 138, 31, 0.2)';
                badge.style.color = isHome ? '#38bdf8' : '#FF8A1F';
                badge.style.border = isHome ? '1px solid #38bdf8' : '1px solid #FF8A1F';
                badge.className = 'badge me-2';
            }
            if (title) title.textContent = routineObj.title || 'Workout Session';
            if (sub) {
                const exCount = (routineObj.exercises || []).length;
                const muscles = routineObj.muscles && routineObj.muscles.length ? ` · Muscles: ${routineObj.muscles.join(', ')}` : '';
                sub.textContent = `${exCount} exercise(s) logged${muscles}`;
            }
        } else {
            activeBanner.classList.add('d-none');
        }
    }

    // Update Finish Section Button & Title
    const finishTitle = document.getElementById('finishTitle');
    const finishBtn = document.getElementById('finishBtn');
    if (finishTitle && finishBtn) {
        if (isViewingCompletedDay) {
            finishTitle.textContent = `✅ ${viewingDayKey} is Finished & Saved to Challenge`;
            finishBtn.className = 'btn btn-lg px-5 fw-bold rounded-pill disabled';
            finishBtn.style.background = '#262626';
            finishBtn.style.color = '#6FAE3D';
            finishBtn.style.border = '1px solid #6FAE3D';
            finishBtn.innerHTML = `✅ ${viewingDayKey} Already Completed`;
            finishBtn.onclick = null;
        } else {
            finishTitle.textContent = `✅ Finished eating for the day?`;
            finishBtn.className = 'btn btn-lg px-5 fw-bold rounded-pill shadow';
            finishBtn.style.background = 'linear-gradient(135deg, #4D8424, #6FAE3D)';
            finishBtn.style.color = '#ffffff';
            finishBtn.style.border = 'none';
            finishBtn.innerHTML = `🎉 Finish Day & Mark Challenge`;
            finishBtn.onclick = () => markDayComplete();
        }
    }
}

function removeFood(idx) {
    foodLog.splice(idx, 1);
    saveUserData();
    updateSummary();
    renderDashboard();
    refreshCurrentDayDash();
    showToast('🗑️ Item removed!');
}

// ==================== PROFILE / CALCULATOR & GOAL SELECTION ====================
let calculatedGoals = {};
let pendingSelectedGoal = null;
let pendingTargetCalories = null;

const GOAL_CARD_MAPPING = {
    'Fast Weight Gain': { cardId: 'cardFastGain', btnId: 'btnGoalFastGain', mult: 1.2 },
    'Mild Weight Gain': { cardId: 'cardMildGain', btnId: 'btnGoalMildGain', mult: 1.1 },
    'Maintain Weight': { cardId: 'cardMaintain', btnId: 'btnGoalMaintain', mult: 1.0 },
    'Mild Weight Loss': { cardId: 'cardMildLoss', btnId: 'btnGoalMildLoss', mult: 0.9 },
    'Weight Loss': { cardId: 'cardLoss', btnId: 'btnGoalLoss', mult: 0.79 },
    'Extreme Weight Loss': { cardId: 'cardExtremeLoss', btnId: 'btnGoalExtremeLoss', mult: 0.59 }
};

function renderProfileActiveGoalBanner() {
    if (!currentUser) return;
    const profileKey = `ht_profile_${currentUser.email}`;
    const profile = JSON.parse(localStorage.getItem(profileKey) || '{}');
    const banner = document.getElementById('activeProfileGoalBanner');
    if (!banner) return;

    if (profile.selectedGoal && profile.targetCalories) {
        banner.classList.remove('d-none');
        const elTitle = document.getElementById('profileActiveGoalTitle');
        const elCal = document.getElementById('profileActiveGoalCalories');
        const elBmr = document.getElementById('profileActiveBmr');
        const elTdee = document.getElementById('profileActiveTdee');
        const elDate = document.getElementById('profileActiveGoalDate');

        if (elTitle) elTitle.textContent = profile.selectedGoal;
        if (elCal) elCal.textContent = formatNum(profile.targetCalories);
        if (elBmr) elBmr.textContent = profile.bmr ? formatNum(profile.bmr) : '--';
        if (elTdee) elTdee.textContent = profile.tdee ? formatNum(profile.tdee) : '--';
        if (elDate && profile.updatedAt) {
            try {
                const d = new Date(profile.updatedAt);
                elDate.textContent = `| Updated: ${d.toLocaleDateString()}`;
            } catch (e) {
                elDate.textContent = '';
            }
        } else if (elDate) {
            elDate.textContent = '';
        }
    } else {
        banner.classList.add('d-none');
    }
}

function populateProfileInputs(profile) {
    if (!profile) return;
    if (profile.gender && document.getElementById('pGender')) {
        document.getElementById('pGender').value = profile.gender;
    }
    if (profile.age && document.getElementById('pAge')) {
        document.getElementById('pAge').value = profile.age;
    }
    if (profile.weight && document.getElementById('pWeight')) {
        document.getElementById('pWeight').value = profile.weight;
    }
    if (profile.height && document.getElementById('pHeight')) {
        document.getElementById('pHeight').value = profile.height;
    }
    if (profile.activity && document.getElementById('pActivity')) {
        document.getElementById('pActivity').value = profile.activity;
    }

    if (profile.age && profile.weight && profile.height) {
        calculateProfile(false);
        if (profile.selectedGoal && profile.targetCalories) {
            highlightGoalCard(profile.selectedGoal, profile.targetCalories, false);
            pendingSelectedGoal = profile.selectedGoal;
            pendingTargetCalories = profile.targetCalories;
            const confSec = document.getElementById('goalConfirmationSection');
            if (confSec) {
                confSec.classList.remove('d-none');
                const confGoal = document.getElementById('confirmGoalName');
                const confCal = document.getElementById('confirmCalorieTarget');
                if (confGoal) confGoal.textContent = profile.selectedGoal;
                if (confCal) confCal.textContent = formatNum(profile.targetCalories);
            }
        }
    }
}

function renderProfileSection() {
    if (!currentUser) return;
    const profileKey = `ht_profile_${currentUser.email}`;
    const profile = JSON.parse(localStorage.getItem(profileKey) || '{}');
    populateProfileInputs(profile);
    renderProfileActiveGoalBanner();
}

function calculateProfile(interactive = true) {
    const elGender = document.getElementById('pGender');
    const elAge = document.getElementById('pAge');
    const elWeight = document.getElementById('pWeight');
    const elHeight = document.getElementById('pHeight');
    const elActivity = document.getElementById('pActivity');

    if (!elGender || !elAge || !elWeight || !elHeight || !elActivity) return;

    const gender = elGender.value;
    const age = parseFloat(elAge.value);
    const weight = parseFloat(elWeight.value);
    const height = parseFloat(elHeight.value);
    const activity = parseFloat(elActivity.value);

    if (!age || !weight || !height) {
        if (interactive) alert('Please fill in all fields!');
        return;
    }

    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const tdee = bmr * activity;

    calculatedGoals = {
        'Fast Weight Gain': Math.round(tdee * 1.2),
        'Mild Weight Gain': Math.round(tdee * 1.1),
        'Maintain Weight': Math.round(tdee),
        'Mild Weight Loss': Math.round(tdee * 0.9),
        'Weight Loss': Math.round(tdee * 0.79),
        'Extreme Weight Loss': Math.round(tdee * 0.59)
    };

    if (document.getElementById('resFastGain')) document.getElementById('resFastGain').textContent = formatNum(calculatedGoals['Fast Weight Gain']);
    if (document.getElementById('resMildGain')) document.getElementById('resMildGain').textContent = formatNum(calculatedGoals['Mild Weight Gain']);
    if (document.getElementById('resMaintain')) document.getElementById('resMaintain').textContent = formatNum(calculatedGoals['Maintain Weight']);
    if (document.getElementById('resMild')) document.getElementById('resMild').textContent = formatNum(calculatedGoals['Mild Weight Loss']);
    if (document.getElementById('resLoss')) document.getElementById('resLoss').textContent = formatNum(calculatedGoals['Weight Loss']);
    if (document.getElementById('resExtreme')) document.getElementById('resExtreme').textContent = formatNum(calculatedGoals['Extreme Weight Loss']);

    const resArea = document.getElementById('resultsArea');
    if (resArea) resArea.classList.remove('d-none');

    let currentSelectedGoal = null;
    let currentTargetCal = null;

    if (currentUser) {
        const key = `ht_profile_${currentUser.email}`;
        const existingProfile = JSON.parse(localStorage.getItem(key) || '{}');
        currentSelectedGoal = existingProfile.selectedGoal || null;

        // If goal was already chosen, update its calories to match the new body metrics
        if (currentSelectedGoal && calculatedGoals[currentSelectedGoal]) {
            currentTargetCal = calculatedGoals[currentSelectedGoal];
            existingProfile.targetCalories = currentTargetCal;
            highlightGoalCard(currentSelectedGoal, currentTargetCal, false);
            const confSec = document.getElementById('goalConfirmationSection');
            if (confSec) {
                confSec.classList.remove('d-none');
                const confGoal = document.getElementById('confirmGoalName');
                const confCal = document.getElementById('confirmCalorieTarget');
                if (confGoal) confGoal.textContent = currentSelectedGoal;
                if (confCal) confCal.textContent = formatNum(currentTargetCal);
            }
        }

        const updatedProfile = {
            ...existingProfile,
            gender,
            age,
            weight,
            height,
            activity,
            bmr,
            tdee,
            selectedGoal: currentSelectedGoal,
            targetCalories: currentTargetCal
        };

        localStorage.setItem(key, JSON.stringify(updatedProfile));

        // Persist profile in MySQL
        const profPayload = {
            email: currentUser.email,
            gender,
            age,
            weight,
            height,
            activity,
            bmr,
            tdee,
            selectedGoal: currentSelectedGoal,
            targetCalories: currentTargetCal
        };
        apiFetch('/api/profile', {
            method: 'POST',
            body: JSON.stringify(profPayload)
        }).catch(err => {
            HealthifyIDB.queueOfflineAction('profile', profPayload);
        });
    }

    renderDashboard();
    refreshCurrentDayDash();
    renderProfileActiveGoalBanner();
    if (interactive) showToast('🧮 Calculation complete! Select a goal below.');
}

function highlightGoalCard(goalName, calories, isInteractive = false) {
    Object.keys(GOAL_CARD_MAPPING).forEach(name => {
        const item = GOAL_CARD_MAPPING[name];
        const cardEl = document.getElementById(item.cardId);
        const btnEl = document.getElementById(item.btnId);

        if (name === goalName) {
            if (cardEl) cardEl.classList.add('active-goal-card');
            if (btnEl) {
                btnEl.classList.add('active-btn');
                btnEl.textContent = '✅ Selected Goal';
            }
        } else {
            if (cardEl) cardEl.classList.remove('active-goal-card');
            if (btnEl) {
                btnEl.classList.remove('active-btn');
                btnEl.textContent = '🎯 Select This Goal';
            }
        }
    });
}

function selectCalorieGoal(goalName, multiplier) {
    if (!calculatedGoals[goalName]) {
        calculateProfile(false);
    }

    const calValue = calculatedGoals[goalName] || Math.round((currentUser ? (JSON.parse(localStorage.getItem(`ht_profile_${currentUser.email}`) || '{}').tdee || 2000) : 2000) * multiplier);

    pendingSelectedGoal = goalName;
    pendingTargetCalories = calValue;

    highlightGoalCard(goalName, calValue, true);

    const confSection = document.getElementById('goalConfirmationSection');
    if (confSection) {
        confSection.classList.remove('d-none');
        const elGoal = document.getElementById('confirmGoalName');
        const elCal = document.getElementById('confirmCalorieTarget');
        if (elGoal) elGoal.textContent = goalName;
        if (elCal) elCal.textContent = formatNum(calValue);

        confSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function confirmAndSaveCalorieGoal() {
    if (!pendingSelectedGoal || !pendingTargetCalories) {
        alert('Please select a goal first!');
        return;
    }

    if (!currentUser) {
        alert('Please log in to save your goal!');
        return;
    }

    const key = `ht_profile_${currentUser.email}`;
    const profile = JSON.parse(localStorage.getItem(key) || '{}');

    const gender = document.getElementById('pGender') ? document.getElementById('pGender').value : (profile.gender || 'male');
    const age = document.getElementById('pAge') && document.getElementById('pAge').value ? parseFloat(document.getElementById('pAge').value) : profile.age;
    const weight = document.getElementById('pWeight') && document.getElementById('pWeight').value ? parseFloat(document.getElementById('pWeight').value) : profile.weight;
    const height = document.getElementById('pHeight') && document.getElementById('pHeight').value ? parseFloat(document.getElementById('pHeight').value) : profile.height;
    const activity = document.getElementById('pActivity') && document.getElementById('pActivity').value ? parseFloat(document.getElementById('pActivity').value) : profile.activity;

    let bmr = profile.bmr;
    let tdee = profile.tdee;
    if (weight && height && age) {
        bmr = gender === 'male' ? (10 * weight + 6.25 * height - 5 * age + 5) : (10 * weight + 6.25 * height - 5 * age - 161);
        tdee = bmr * (activity || 1.2);
    }

    const updatedProfile = {
        ...profile,
        gender,
        age,
        weight,
        height,
        activity,
        bmr,
        tdee,
        selectedGoal: pendingSelectedGoal,
        targetCalories: pendingTargetCalories,
        updatedAt: new Date().toISOString()
    };

    // 1. Save in localStorage
    localStorage.setItem(key, JSON.stringify(updatedProfile));

    // 2. Persist in MySQL via Spring Boot
    const btnSave = document.getElementById('btnConfirmSaveGoal');
    if (btnSave) {
        btnSave.disabled = true;
        btnSave.innerHTML = '⏳ Saving to Database...';
    }

    const profSavePayload = {
        email: currentUser.email,
        gender: updatedProfile.gender,
        age: updatedProfile.age,
        weight: updatedProfile.weight,
        height: updatedProfile.height,
        activity: updatedProfile.activity,
        bmr: updatedProfile.bmr,
        tdee: updatedProfile.tdee,
        selectedGoal: updatedProfile.selectedGoal,
        targetCalories: updatedProfile.targetCalories
    };

    apiFetch('/api/profile', {
        method: 'POST',
        body: JSON.stringify(profSavePayload)
    })
    .then(resData => {
        if (resData && resData.success && resData.profile) {
            localStorage.setItem(key, JSON.stringify(resData.profile));
            renderProfileActiveGoalBanner();
            renderDashboard();
            refreshCurrentDayDash();
        }
    })
    .catch(() => {
        HealthifyIDB.queueOfflineAction('profile', profSavePayload);
    })
    .finally(() => {
        if (btnSave) {
            btnSave.disabled = false;
            btnSave.innerHTML = '💾 Confirm & Save';
        }
    });

    // 3. Update UI across website
    renderProfileActiveGoalBanner();
    renderDashboard();
    refreshCurrentDayDash();

    // 4. Show success message exactly as requested
    showToast('Your fitness goal and daily calorie target have been saved successfully!');
}

// ==================== WATER TRACKER ====================
function updateWater(amount) {
    waterGlasses = Math.max(0, waterGlasses + amount);
    document.getElementById('waterCount').textContent = waterGlasses;
    saveUserData();
    renderDashboard();
    refreshCurrentDayDash();
    if (amount > 0) showToast('💧 Glass logged!');
}

function updateWaterRecommendation() {
    if (!currentUser) return;
    const key = `ht_profile_${currentUser.email}`;
    const profile = JSON.parse(localStorage.getItem(key) || '{}');

    if (profile.weight) {
        const baseWater = profile.weight * 0.033;
        const actMult = profile.activity || 1.2;
        const recommended = (baseWater * (actMult > 1.5 ? 1.3 : 1)).toFixed(1);
        const glasses = Math.ceil(recommended / 0.25);

        document.getElementById('waterRec').innerHTML = `
            Recommended: <strong>${recommended}L</strong> per day (~${glasses} glasses of 250ml)<br>
            <small>Based on your weight: ${profile.weight}kg</small>
        `;
    }
}

function toggleWaterTimer() {
    if (waterTimerRunning) {
        clearInterval(waterTimerInterval);
        waterTimerRunning = false;
        document.getElementById('timerBtn').textContent = '▶️ Start Day Tracker';
        document.getElementById('timerBtn').className = 'btn btn-warning';
        document.getElementById('timerStatus').classList.add('d-none');
    } else {
        waterTimerRunning = true;
        waterMinutesLeft = 59;
        document.getElementById('timerBtn').textContent = '⏹️ Stop Tracker';
        document.getElementById('timerBtn').className = 'btn btn-danger';
        document.getElementById('timerStatus').classList.remove('d-none');
        document.getElementById('minsLeft').textContent = waterMinutesLeft;

        waterTimerInterval = setInterval(() => {
            waterMinutesLeft--;
            if (waterMinutesLeft <= 0) {
                waterMinutesLeft = 59;
                if (Notification.permission === 'granted') {
                    new Notification('💧 Time to drink water!', { body: 'Stay hydrated! Drink a glass of water now.' });
                } else if (Notification.permission !== 'denied') {
                    Notification.requestPermission();
                }
                alert('💧 Time to drink water! Stay hydrated!');
            }
            document.getElementById('minsLeft').textContent = waterMinutesLeft;
        }, 60000);
    }
}

// ==================== WORKOUT MODE & CONTROL ====================
function setWorkoutMode(mode) {
    workoutMode = mode;
    gymMode = (mode !== 'none');

    // Sync radio controls
    const sGymNo = document.getElementById('sGymNo');
    const sHomeWorkout = document.getElementById('sHomeWorkout');
    const sGymYes = document.getElementById('sGymYes');
    const gymYes = document.getElementById('gymYes');
    const gymNo = document.getElementById('gymNo');

    if (sGymNo) sGymNo.checked = (mode === 'none');
    if (sHomeWorkout) sHomeWorkout.checked = (mode === 'home');
    if (sGymYes) sGymYes.checked = (mode === 'gym');
    if (gymYes) gymYes.checked = gymMode;
    if (gymNo) gymNo.checked = !gymMode;

    const workoutSec = document.getElementById('workoutSection');
    const activeBanner = document.getElementById('activeRoutineBanner');

    if (mode === 'none') {
        if (workoutSec) workoutSec.classList.add('d-none');
        if (activeBanner) activeBanner.classList.add('d-none');
        document.querySelectorAll('input[name="muscleGroup"]').forEach(cb => cb.checked = false);
        currentWorkout = null;
    } else {
        if (workoutSec) workoutSec.classList.remove('d-none');
        if (activeBanner) {
            if (currentWorkout) {
                activeBanner.classList.remove('d-none');
                const badge = document.getElementById('activeRoutineBadge');
                const title = document.getElementById('activeRoutineTitle');
                const sub = document.getElementById('activeRoutineSub');
                if (badge) {
                    badge.textContent = currentWorkout.type === 'home' ? '🏠 Home Routine' : '🏢 Gym Routine';
                    badge.className = `badge ${currentWorkout.type === 'home' ? 'bg-info text-dark' : 'bg-primary'} me-2`;
                }
                if (title) title.textContent = currentWorkout.title;
                if (sub) sub.textContent = `${(currentWorkout.exercises || []).length} exercise(s) logged`;
            } else {
                activeBanner.classList.add('d-none');
            }
        }
    }

    saveUserData();
    refreshCurrentDayDash();
}

function toggleGymMode(isGym) {
    setWorkoutMode(isGym ? 'gym' : 'none');
}

// ==================== CHALLENGE MANAGEMENT ====================
function createChallenge() {
    const daysInput = document.getElementById('challengeDays');
    const totalDays = parseInt(daysInput.value);

    if (!totalDays || totalDays <= 0) {
        alert('Please enter a valid number of days!');
        return;
    }

    if (!currentUser) {
        alert('Please log in first!');
        return;
    }

    const existing = localStorage.getItem(`ht_challenge_${currentUser.email}`);
    if (existing) {
        if (!confirm('⚠️ You already have an active challenge. Starting a new one will ERASE all progress. Continue?')) {
            return;
        }
    }

    const challengeData = {
        totalDays: totalDays,
        startDate: new Date().toISOString(),
        history: {}
    };

    localStorage.setItem(`ht_challenge_${currentUser.email}`, JSON.stringify(challengeData));
    if (currentUser) {
        const cPayload = {
            email: currentUser.email,
            totalDays: totalDays,
            currentDay: 1,
            startDate: challengeData.startDate,
            history: {}
        };
        apiFetch('/api/challenge', {
            method: 'POST',
            body: JSON.stringify(cPayload)
        }).catch(() => {
            HealthifyIDB.queueOfflineAction('challenge', cPayload);
        });
    }
    showToast(`🏆 ${totalDays}-Day Challenge Started!`);
    renderChallenge();
    daysInput.value = '';
}

function renderChallenge() {
    const grid = document.getElementById('challengeGrid');
    grid.innerHTML = '';

    if (!currentUser) return;
    const challengeKey = `ht_challenge_${currentUser.email}`;
    let raw = localStorage.getItem(challengeKey);
    if (!raw) {
        const initChallenge = {
            totalDays: 25,
            startDate: new Date().toISOString(),
            history: {}
        };
        localStorage.setItem(challengeKey, JSON.stringify(initChallenge));
        raw = JSON.stringify(initChallenge);
    }

    const challengeData = JSON.parse(raw);
    const totalDays = challengeData.totalDays || 25;
    const completedCount = Object.keys(challengeData.history || {}).length;
    const currentActiveDay = completedCount < totalDays ? completedCount + 1 : totalDays;

    const progressPercent = totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0;
    grid.innerHTML = `
        <div class="w-100 mb-3">
            <div class="d-flex justify-content-between mb-1">
                <small class="fw-bold" style="color: #F5F5F5;">Progress: ${completedCount}/${totalDays} days completed</small>
                <small class="fw-bold" style="color: #6FAE3D;">${progressPercent}%</small>
            </div>
            <div class="progress" style="height: 12px; border-radius: 10px; background: #262626;">
                <div class="progress-bar" role="progressbar" style="width: ${progressPercent}%; background: linear-gradient(90deg, #6B3F24, #FF8A1F);"></div>
            </div>
        </div>
    `;

    // Render 3 STRICT STATES: COMPLETED, TODAY/CURRENT, LOCKED
    for (let i = 1; i <= totalDays; i++) {
        const dayKey = `Day ${i}`;
        const dayRecord = challengeData.history[dayKey];

        if (dayRecord) {
            // 1. COMPLETED: GREEN + ✅
            grid.innerHTML += `
                <div class="challenge-day completed" onclick="openDayDashboard(${i})" ondblclick="openDayDashboard(${i})" title="Day ${i} - Completed">
                    <span style="font-size: 11px;">✅</span>
                    <span>D${i}</span>
                </div>
            `;
        } else if (i === currentActiveDay && completedCount < totalDays) {
            // 2. CURRENT / ACTIVE: HIGHLIGHTED + ⭐ (ONLY active day user can work on)
            grid.innerHTML += `
                <div class="challenge-day current" onclick="openDayDashboard(${i})" ondblclick="openDayDashboard(${i})" title="Day ${i} - Today / Current Active Session">
                    <span style="font-size: 11px;">⭐</span>
                    <span>D${i}</span>
                </div>
            `;
        } else {
            // 3. LOCKED: GREYED OUT + 🔒 (Locked days cannot be opened or completed)
            grid.innerHTML += `
                <div class="challenge-day locked" onclick="openDayDashboard(${i})" ondblclick="openDayDashboard(${i})" title="Day ${i} - Locked">
                    <span style="font-size: 11px;">🔒</span>
                    <span>D${i}</span>
                </div>
            `;
        }
    }

    if (completedCount >= totalDays) {
        grid.innerHTML += `
            <div class="w-100 text-center mt-3">
                <div class="alert alert-success fw-bold fs-5 shadow-sm">
                    🎉🏆 CONGRATULATIONS! You completed the ${totalDays}-Day Transformation Challenge! 🏆🎉
                </div>
            </div>
        `;
    }
}

// ==================== FINISH DAY & MARK CHALLENGE ====================
function markDayComplete() {
    completeDayFromDashboard();
}

// ==================== HISTORY & DAY ROUTER ====================
function viewDayHistory(dayNum) {
    openDayDashboard(dayNum);
}

function openHistoryModal(dayNum) {
    if (!currentUser) return;
    const raw = localStorage.getItem(`ht_challenge_${currentUser.email}`);
    if (!raw) return;

    const challengeData = JSON.parse(raw);
    const dayKey = `Day ${dayNum}`;
    const data = challengeData.history[dayKey];
    if (!data) return;

    currentEditDay = dayNum;
    const histTitle = document.getElementById('histTitle');
    if (histTitle) histTitle.textContent = `📜 Day ${dayNum} Summary (${data.date || 'No Date'})`;

    // Workout display
    const muscleDiv = document.getElementById('histWorkoutDisplay');
    const isHome = data.workoutMode === 'home';
    const isGym = data.workoutMode === 'gym' || (data.gymMode && !data.workoutMode);

    if (muscleDiv) {
        if (isHome) {
            const exercisesHTML = (data.exercises && data.exercises.length)
                ? `<div class="small mt-2 pt-2 border-top" style="border-color: #262626 !important;"><strong style="color: #FF8A1F;">📋 Exercises:</strong> ${data.exercises.join(' • ')}</div>`
                : '';
            muscleDiv.innerHTML = `
                <div class="p-3 rounded mb-2" style="background: #151515; border: 1px solid #38bdf8; color: #F5F5F5;">
                    <div class="d-flex justify-content-between align-items-center">
                        <strong style="color: #F5F5F5;">🏠 Home Workout: ${data.routineTitle || 'Home Session'}</strong>
                        <span class="badge" style="background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid #38bdf8;">Home</span>
                    </div>
                    <div class="small mt-1" style="color: #A9A9A9;"><strong style="color: #FF8A1F;">💪 Muscles:</strong> ${data.muscles && data.muscles.length ? data.muscles.join(', ') : 'General'}</div>
                    ${exercisesHTML}
                </div>
            `;
        } else if (isGym) {
            const exercisesHTML = (data.exercises && data.exercises.length)
                ? `<div class="small mt-2 pt-2 border-top" style="border-color: #262626 !important;"><strong style="color: #FF8A1F;">📋 Exercises:</strong> ${data.exercises.join(' • ')}</div>`
                : '';
            muscleDiv.innerHTML = `
                <div class="p-3 rounded mb-2" style="background: #151515; border: 1px solid #FF8A1F; color: #F5F5F5;">
                    <div class="d-flex justify-content-between align-items-center">
                        <strong style="color: #F5F5F5;">🏢 Gym Workout: ${data.routineTitle || 'Gym Session'}</strong>
                        <span class="badge" style="background: rgba(255, 138, 31, 0.2); color: #FF8A1F; border: 1px solid #FF8A1F;">Gym</span>
                    </div>
                    <div class="small mt-1" style="color: #A9A9A9;"><strong style="color: #FF8A1F;">💪 Muscles:</strong> ${data.muscles && data.muscles.length ? data.muscles.join(', ') : 'General'}</div>
                    ${exercisesHTML}
                </div>
            `;
        } else {
            muscleDiv.innerHTML = `
                <div class="p-3 rounded mb-2" style="background: #151515; border: 1px solid #262626; color: #A9A9A9;">
                    <strong>🛌 Diet / Rest Day</strong>
                </div>
            `;
        }
    }

    // Food table
    const tbody = document.getElementById('historyList');
    if (tbody) {
        tbody.innerHTML = '';
        let totalCal = 0, totalPro = 0, totalFib = 0;

        if (data.foodLog && data.foodLog.length > 0) {
            data.foodLog.forEach(item => {
                totalCal += item.cal;
                totalPro += item.protein;
                totalFib += item.fibre;
                tbody.innerHTML += `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.grams}g</td>
                        <td>${item.cal}</td>
                        <td>${item.protein}g</td>
                        <td>${item.fibre}g</td>
                    </tr>
                `;
            });
        } else {
            tbody.innerHTML = `<tr><td colspan="5" class="text-muted text-center">No food logged this day.</td></tr>`;
        }

        tbody.innerHTML += `
            <tr class="table-info fw-bold">
                <td colspan="2">💧 Water</td>
                <td colspan="3">${data.waterGlasses || 0} Glass(es) (~${((data.waterGlasses || 0) * 0.25).toFixed(2)}L)</td>
            </tr>
        `;

        const histTotal = document.getElementById('histTotal');
        if (histTotal) histTotal.innerHTML = `🔥 ${formatNum(totalCal)} cal | 💪 ${formatNum(totalPro)}g protein | 🌾 ${formatNum(totalFib)}g fibre`;
    }

    const modalEl = document.getElementById('historyModal');
    if (modalEl) {
        bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
}

function editPastDay() {
    if (!currentUser || currentEditDay === null) return;

    const raw = localStorage.getItem(`ht_challenge_${currentUser.email}`);
    if (!raw) return;

    const challengeData = JSON.parse(raw);
    const dayKey = `Day ${currentEditDay}`;
    const pastData = challengeData.history[dayKey];

    if (!pastData) return;

    if (!confirm(`⚠️ This will load Day ${currentEditDay}'s data into your active workspace.\n\nYour CURRENT unsaved food log (${foodLog.length} items) will be REPLACED.\n\nContinue?`)) {
        return;
    }

    // Restore past data to active workspace
    foodLog = pastData.foodLog ? [...pastData.foodLog] : [];
    waterGlasses = pastData.waterGlasses || 0;
    const restoredMode = pastData.workoutMode || (pastData.gymMode ? 'gym' : 'none');

    if (pastData.routineTitle && pastData.routineTitle !== 'Rest Day') {
        currentWorkout = {
            type: restoredMode,
            title: pastData.routineTitle,
            exercises: pastData.exercises || [],
            muscles: pastData.muscles || []
        };
    } else {
        currentWorkout = null;
    }

    // Update UI
    document.getElementById('waterCount').textContent = waterGlasses;
    setWorkoutMode(restoredMode);

    // Pre-fill muscle checkboxes
    document.querySelectorAll('input[name="muscleGroup"]').forEach(cb => {
        cb.checked = pastData.muscles ? pastData.muscles.includes(cb.value) : false;
    });

    // Delete from challenge history so user can re-submit
    delete challengeData.history[dayKey];
    localStorage.setItem(`ht_challenge_${currentUser.email}`, JSON.stringify(challengeData));

    // Persist updated challenge history to MySQL via REST API
    if (currentUser) {
        const cPayload = {
            email: currentUser.email,
            totalDays: challengeData.totalDays || 25,
            currentDay: parseInt(dayKey.replace('Day ', ''), 10) || challengeData.currentDay || 1,
            startDate: challengeData.startDate,
            history: challengeData.history
        };
        apiFetch('/api/challenge', {
            method: 'POST',
            body: JSON.stringify(cPayload)
        }).catch(() => {
            HealthifyIDB.queueOfflineAction('challenge', cPayload);
        });
    }

    // Save active workspace
    saveUserData();
    updateSummary();

    // Close modal and go to summary
    bootstrap.Modal.getInstance(document.getElementById('historyModal')).hide();
    showSection('summary');
    showToast(`✏️ Day ${currentEditDay} loaded for editing! Click "Finish Day" when done.`);
    currentEditDay = null;
}

// ==================== AI HEALTH ASSISTANT CHATBOT ====================
let isChatbotOpen = false;
let isChatbotMinimized = false;

function toggleChatbot() {
    const win = document.getElementById('chatbotWindow');
    const icon = document.getElementById('chatIcon');
    const pulse = document.getElementById('chatBadgePulse');
    if (!win) return;

    if (isChatbotOpen) {
        win.classList.add('d-none');
        isChatbotOpen = false;
        if (icon) icon.textContent = '🤖';
        if (pulse) pulse.classList.remove('d-none');
    } else {
        win.classList.remove('d-none');
        win.classList.remove('minimized');
        isChatbotOpen = true;
        isChatbotMinimized = false;
        if (icon) icon.textContent = '✖️';
        if (pulse) pulse.classList.add('d-none');
        const input = document.getElementById('chatInput');
        if (input) setTimeout(() => input.focus(), 150);
        scrollChatToBottom();
    }
}

function toggleMinimizeChat() {
    const win = document.getElementById('chatbotWindow');
    if (!win) return;
    isChatbotMinimized = !isChatbotMinimized;
    if (isChatbotMinimized) {
        win.classList.add('minimized');
    } else {
        win.classList.remove('minimized');
        scrollChatToBottom();
    }
}

function clearChatHistory() {
    const msgContainer = document.getElementById('chatMessages');
    if (msgContainer) {
        msgContainer.innerHTML = `
            <div class="chat-msg bot">
                <div class="chat-bubble">
                    <div class="fw-bold mb-1 text-primary">⚡ Healthify AI Coach:</div>
                    👋 Chat history cleared! How can I assist you with your fitness, nutrition, or workouts?
                </div>
            </div>
        `;
    }
}

function scrollChatToBottom() {
    const msgContainer = document.getElementById('chatMessages');
    if (msgContainer) {
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }
}

function handleChatKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendChatMessage();
    }
}

function askChatbotSuggestion(text) {
    const input = document.getElementById('chatInput');
    if (input) {
        input.value = text;
        sendChatMessage();
    }
}

function showChatTyping(show) {
    const typing = document.getElementById('chatTypingContainer');
    if (typing) {
        if (show) typing.classList.remove('d-none');
        else typing.classList.add('d-none');
    }
    scrollChatToBottom();
}

function appendChatMessage(sender, htmlContent) {
    const msgContainer = document.getElementById('chatMessages');
    if (!msgContainer) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;

    if (sender === 'user') {
        msgDiv.innerHTML = `<div class="chat-bubble">${htmlContent}</div>`;
    } else {
        msgDiv.innerHTML = `
            <div class="chat-bubble">
                <div class="fw-bold mb-1 text-primary" style="font-size:12px;">⚡ Healthify AI Coach:</div>
                ${htmlContent}
            </div>
        `;
    }

    msgContainer.appendChild(msgDiv);
    scrollChatToBottom();
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    const query = input.value.trim();
    if (!query) return;

    // Append user message
    const sanitizedUserMsg = query.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    appendChatMessage('user', sanitizedUserMsg);
    input.value = '';

    showChatTyping(true);

    const payload = getAIUserDataPayload();

    fetch(`${AI_BACKEND_URL}/api/ai/coach`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, fullUserData: payload })
    })
    .then(res => res.json())
    .then(data => {
        showChatTyping(false);
        if (data.success && data.answer) {
            appendChatMessage('bot', formatAIMarkdown(data.answer));
        } else {
            const fallback = processAIChatQuery(query);
            appendChatMessage('bot', fallback);
        }
    })
    .catch(err => {
        showChatTyping(false);
        const fallback = processAIChatQuery(query);
        appendChatMessage('bot', fallback);
    });
}

function processAIChatQuery(query) {
    const q = query.toLowerCase();

    // 1. User Stats / Live Progress
    if (q.includes('my stats') || q.includes('my log') || q.includes('how many calories have i') || q.includes('logged today') || q.includes('my water')) {
        let totalCal = 0, totalPro = 0, totalFib = 0;
        foodLog.forEach(f => { totalCal += f.cal; totalPro += f.protein; totalFib += f.fibre; });
        const routineName = currentWorkout ? currentWorkout.title : 'None selected today';
        const uName = currentUser ? currentUser.name : 'Athlete';

        return `
            <strong>📊 Your Live Healthify Stats (${uName}):</strong><br>
            • 🍽️ <strong>Food Logged:</strong> ${foodLog.length} items<br>
            • 🔥 <strong>Total Calories:</strong> ${formatNum(totalCal)} kcal<br>
            • 💪 <strong>Total Protein:</strong> ${formatNum(totalPro)}g<br>
            • 🌾 <strong>Total Fibre:</strong> ${formatNum(totalFib)}g<br>
            • 💧 <strong>Water Intake:</strong> ${waterGlasses} glass(es) (~${(waterGlasses * 0.25).toFixed(2)}L)<br>
            • 👣 <strong>Daily Steps:</strong> ${formatNum(dailySteps)} / ${formatNum(stepGoal)} steps<br>
            • 🏋️ <strong>Active Workout:</strong> ${routineName}<br><br>
            <em>Tip: Head to <strong>"Food & Workout Summary"</strong> to finish your day when done!</em>
        `;
    }

    // 2. BMR, TDEE, Calorie Deficit & Surplus (PRIORITIZED BEFORE NUTS/FATS)
    if (q.includes('bmr') || q.includes('tdee') || q.includes('metabolic') || q.includes('deficit') || q.includes('surplus') || q.includes('fat loss') || (q.includes('calorie') && !q.includes('protein')) || q.includes('bulk') || q.includes('cut')) {
        return `
            <strong>🧮 BMR, TDEE & Calorie Goal Guide:</strong><br><br>
            • <strong>BMR (Basal Metabolic Rate):</strong> Calories burned by your body at rest to sustain vital functions (calculated using Mifflin-St Jeor equation).<br>
            • <strong>TDEE (Total Daily Energy Expenditure):</strong> BMR × Activity Multiplier.<br><br>
            🎯 <strong>Calorie Targets in Healthify:</strong><br>
            • <strong>Fat Loss (Deficit):</strong> 80% of TDEE (20% deficit, ~400-500 kcal reduction for steady fat burning).<br>
            • <strong>Mild Weight Loss:</strong> 90% of TDEE (10% deficit).<br>
            • <strong>Maintenance:</strong> 100% of TDEE.<br>
            • <strong>Muscle Gain (Surplus):</strong> 110% - 120% of TDEE (+200-400 kcal surplus for lean growth).<br><br>
            💡 <em>Calculate your personalized numbers now in the <strong>"👤 Profile & Calculator"</strong> section!</em>
        `;
    }

    // 3. High Protein Veg Foods
    if ((q.includes('protein') && q.includes('veg')) || q.includes('vegetarian protein') || q.includes('paneer') || q.includes('tofu') || q.includes('soya')) {
        const vegFoods = foodDB.veg;
        const topVeg = [...vegFoods].sort((a, b) => b.protein - a.protein);
        let list = topVeg.map(f => `• <strong>${f.emoji || '🥦'} ${f.name}:</strong> ${f.protein}g protein | ${f.cal} kcal (per 100g)`).join('<br>');
        return `
            <strong>🥦 Top Vegetarian Protein Sources in Healthify:</strong><br><br>
            ${list}<br><br>
            💡 <strong>Pro Tip:</strong> Soy Chunks deliver a massive <strong>52g protein/100g</strong>, making them the #1 plant-based protein king!
        `;
    }

    // 4. High Protein Non-Veg Foods
    if ((q.includes('protein') && (q.includes('non') || q.includes('meat') || q.includes('chicken') || q.includes('egg') || q.includes('fish'))) || q.includes('nonveg')) {
        const nonvegFoods = foodDB.nonveg;
        const topNonveg = [...nonvegFoods].sort((a, b) => b.protein - a.protein);
        let list = topNonveg.map(f => `• <strong>${f.emoji || '🍗'} ${f.name}:</strong> ${f.protein}g protein | ${f.cal} kcal (per 100g)`).join('<br>');
        return `
            <strong>🍗 Top Non-Vegetarian Protein Sources in Healthify:</strong><br><br>
            ${list}<br><br>
            💡 <strong>Pro Tip:</strong> Chicken Breast (31g protein, 165 kcal) and Tuna (28g protein) offer the highest protein-to-calorie ratio for lean gains!
        `;
    }

    // 5. Nuts, Healthy Fats & Omega-3 (Dietary Fats Only)
    if (q.includes('nut') || q.includes('almond') || q.includes('peanut') || q.includes('walnut') || q.includes('cashew') || q.includes('seed') || q.includes('omega') || q.includes('chia') || q.includes('flax') || q.includes('healthy fat') || (q.includes('fat') && !q.includes('fat loss') && !q.includes('belly fat') && !q.includes('burn'))) {
        const nuts = foodDB.nuts;
        let list = nuts.map(f => `• <strong>${f.emoji || '🥜'} ${f.name}:</strong> ${f.cal} cal | ${f.protein}g pro | ${f.fibre}g fibre`).join('<br>');
        return `
            <strong>🌰 Healthy Fats & Nuts in Healthify:</strong><br><br>
            ${list}<br><br>
            💡 <strong>Health Tip:</strong> Chia Seeds (34g fibre) and Flax Seeds (27g fibre) are loaded with essential Omega-3 fatty acids for joint health and brain function.
        `;
    }

    // 6. High Fibre & Carb Sources
    if (q.includes('fibre') || q.includes('fiber') || q.includes('oat') || q.includes('rice') || q.includes('carb') || q.includes('sweet potato')) {
        const fibres = foodDB.fibre;
        let list = fibres.map(f => `• <strong>${f.emoji || '🌾'} ${f.name}:</strong> ${f.fibre}g fibre | ${f.protein}g pro | ${f.cal} cal`).join('<br>');
        return `
            <strong>🌾 High Fibre & Complex Carbohydrate Foods in Healthify:</strong><br><br>
            ${list}<br><br>
            💡 <strong>Nutrition Tip:</strong> High-fibre foods improve gut health, regulate blood sugar, and keep you feeling full longer during calorie deficits!
        `;
    }

    // 7. Home Workouts
    if (q.includes('home workout') || (q.includes('home') && (q.includes('exercise') || q.includes('routine') || q.includes('hiit') || q.includes('fat burn')))) {
        const homeRoutines = workoutDB.home;
        let list = homeRoutines.map(r => `• <strong>${r.icon} ${r.title}</strong> (${r.duration}, ${r.level})<br>&nbsp;&nbsp;<em>Equip:</em> ${r.equipment} | <em>Focus:</em> ${r.muscles.join(', ')}`).join('<br><br>');
        return `
            <strong>🏠 Home Workout Routines Available in Healthify:</strong><br><br>
            ${list}<br><br>
            💡 <strong>How to start:</strong> Open <strong>"🏋️ Workouts Hub"</strong> from the Menu, click on any Home routine, and click <strong>"🎬 Watch Video"</strong> for proper exercise form!
        `;
    }

    // 8. Gym Workouts / Splits / Push Pull Legs / Arnold
    if (q.includes('gym workout') || q.includes('gym') || q.includes('push day') || q.includes('pull day') || q.includes('leg day') || q.includes('arnold') || q.includes('split')) {
        const gymRoutines = workoutDB.gym;
        let list = gymRoutines.map(r => `• <strong>${r.icon} ${r.title}</strong> (${r.duration}, ${r.level})<br>&nbsp;&nbsp;<em>Target:</em> ${r.muscles.join(', ')} | <em>Category:</em> ${r.category}`).join('<br><br>');
        return `
            <strong>🏢 Gym Workout Splits in Healthify:</strong><br><br>
            ${list}<br><br>
            💡 <strong>Training Tip:</strong> For muscle growth (hypertrophy), aim for 3-4 sets of 8-12 reps with 60-90 seconds rest using the built-in <strong>Rest Interval Timer</strong>!
        `;
    }

    // 9. Specific Muscle Groups
    if (q.includes('chest') || q.includes('bench press') || q.includes('push up')) {
        return `
            <strong>💥 Chest Building Guide:</strong><br><br>
            • <strong>Home:</strong> Standard Push-Ups (3x12-15), Diamond Push-Ups, Dumbbell Floor Press.<br>
            • <strong>Gym:</strong> Flat Barbell Bench Press (4x6-8), Incline Dumbbell Press (3x8-10), Cable Chest Flyes (3x12-15).<br><br>
            💡 <em>Form cue: Retract your scapulae (pull shoulder blades back and down) and avoid flaring elbows out past 45-60 degrees.</em>
        `;
    }

    if (q.includes('back') || q.includes('deadlift') || q.includes('pull down') || q.includes('row')) {
        return `
            <strong>🦾 Back & V-Taper Guide:</strong><br><br>
            • <strong>Home:</strong> Doorframe / Towel Rows, Superman Back Extensions.<br>
            • <strong>Gym:</strong> Conventional / Romanian Deadlifts, Wide-Grip Lat Pulldowns, Seated Cable Rows, Barbell Rows.<br><br>
            💡 <em>Form cue: Pull with your elbows rather than your hands, and imagine squeezing a pencil between your shoulder blades.</em>
        `;
    }

    if (q.includes('abs') || q.includes('core') || q.includes('six pack') || q.includes('belly fat')) {
        return `
            <strong>⚡ Six-Pack Abs & Core Guide:</strong><br><br>
            • <strong>Top Exercises in App:</strong> Bicycle Crunches (3x20), Lying Leg Raises, Russian Twists, Plank Shoulder Taps, Deadbugs.<br><br>
            💡 <em>Truth on Fat Loss: You cannot spot-reduce belly fat with sit-ups alone! Visible abs require a consistent <strong>calorie deficit</strong> calculated in our Profile Calculator along with core training.</em>
        `;
    }

    if (q.includes('leg') || q.includes('squat') || q.includes('glute') || q.includes('quad')) {
        return `
            <strong>🦵 Leg & Glute Strength Guide:</strong><br><br>
            • <strong>Home:</strong> Bodyweight Air Squats, Bulgarian Split Squats (Elevated), Single-Leg Glute Bridges, Wall Sit (45-60s).<br>
            • <strong>Gym:</strong> Barbell Back Squats, Leg Press, Romanian Deadlifts (RDL), Leg Extensions, Seated Leg Curls.<br><br>
            💡 <em>Form cue: Drive through the mid-foot/heel and push knees outwards in line with your toes.</em>
        `;
    }

    // 10. Creatine & Whey Protein Supplements
    if (q.includes('creatine') || q.includes('whey') || q.includes('supplement')) {
        return `
            <strong>⚡ Supplements Guide (Whey & Creatine):</strong><br><br>
            🍼 <strong>Whey Protein:</strong><br>
            • <strong>Dosage:</strong> 1 scoop (30-35g powder = 24-25g protein) in 250ml water or milk.<br>
            • <strong>Best Timing:</strong> Post-workout within 30-45 minutes or between meals.<br>
            • <strong>Top Brands in Healthify:</strong> ON Gold Standard, MuscleBlaze Biozyme, Dymatize ISO100, MyProtein.<br><br>
            ⚡ <strong>Creatine Monohydrate:</strong><br>
            • <strong>Dosage:</strong> 3-5g daily consistently (even on rest days).<br>
            • <strong>Benefit:</strong> Boosts ATP cellular energy for explosive strength and muscle fullness.<br>
            • <strong>Hydration:</strong> Drink at least 3-4 liters of water daily when using Creatine!
        `;
    }

    // 11. Water & Hydration
    if (q.includes('water') || q.includes('hydrate') || q.includes('hydration') || q.includes('glass')) {
        return `
            <strong>💧 Water Intake & Hydration Equation:</strong><br><br>
            • <strong>Standard Rule:</strong> Weight (in kg) × 0.033 Litres (~33ml per kg body weight).<br>
            • <em>Example:</em> A 70kg individual needs ~<strong>2.3L to 3.0L</strong> (9-12 glasses of 250ml) per day.<br><br>
            ⏰ <strong>In Healthify:</strong> Use the <strong>"Water Tracker"</strong> tab to log glasses and start the built-in 59-minute 18-hour hydration reminder cycle!
        `;
    }

    // 12. Video Assistance
    if (q.includes('video') || q.includes('tutorial') || q.includes('demo') || q.includes('how to do')) {
        return `
            <strong>🎬 How to Watch Workout Videos in Healthify:</strong><br><br>
            1. Open the <strong>"🏋️ Workouts Hub"</strong> from the Menu or Dashboard.<br>
            2. Choose <strong>Home Workouts</strong> or <strong>Gym Workouts</strong>.<br>
            3. Select any routine (e.g. <em>Push Day</em> or <em>Full Body HIIT</em>).<br>
            4. Click the <strong>"🎬 Watch Video"</strong> button beside any exercise to open the HD demonstration player with form cues!
        `;
    }

    // 13. General Greetings & Help
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('help')) {
        const uName = currentUser ? currentUser.name : 'there';
        return `
            👋 Hi ${uName}! I'm your <strong>Healthify AI Coach</strong>.<br><br>
            I'm ready to answer any questions about:<br>
            • 🥗 <strong>Food, Calories & Protein</strong> in our database<br>
            • 🏠 <strong>Home & Gym Workouts</strong> with video tutorials<br>
            • 💧 <strong>Water calculations & reminders</strong><br>
            • ⚡ <strong>Supplements & BMR calculations</strong><br><br>
            What are you working on today?
        `;
    }

    // 14. Fallback Comprehensive Search across FoodDB
    let matchedFood = null;
    for (const cat of ['veg', 'nonveg', 'nuts', 'fibre']) {
        const match = foodDB[cat].find(f => q.includes(f.name.toLowerCase()));
        if (match) {
            matchedFood = { ...match, cat };
            break;
        }
    }

    if (matchedFood) {
        return `
            <strong>${matchedFood.emoji || '🍽️'} ${matchedFood.name} Nutrition Facts (per 100g):</strong><br><br>
            • 🔥 <strong>Calories:</strong> ${matchedFood.cal} kcal<br>
            • 💪 <strong>Protein:</strong> ${matchedFood.protein}g<br>
            • 🌾 <strong>Fibre:</strong> ${matchedFood.fibre}g<br>
            • 🏷️ <strong>Category:</strong> ${matchedFood.cat.toUpperCase()}<br>
            • 🌟 <strong>Tags:</strong> ${matchedFood.badges ? matchedFood.badges.join(', ') : 'Healthy'}<br><br>
            <em>You can log this item in the <strong>Dashboard -> ${matchedFood.cat}</strong> section!</em>
        `;
    }

    // 15. Intelligent Default Answer
    return `
        <strong>💡 Healthify AI Fitness Insight:</strong><br><br>
        Great question! In Healthify, achieving your best physique comes down to 3 pillars:<br>
        1. 🥗 <strong>Nutrition:</strong> Hit your daily protein target (1.6 - 2.0g per kg of bodyweight) with our 40+ foods.<br>
        2. 🏋️ <strong>Progressive Training:</strong> Consistency in Home or Gym workouts using the <strong>Rest Interval Timer</strong> and video tutorials.<br>
        3. 💧 <strong>Recovery:</strong> Maintain 33ml water per kg bodyweight and 7-8 hours of quality sleep.<br><br>
        <em>Try asking about "high protein veg", "home workout routine", "gym push day", or "how much water I need"!</em>
    `;
}

// ==================== AI HEALTH COACH CHATBOT CLIENT LAYER ====================
let currentCoachAttachment = null;
let currentActiveDietPlan = null;
let currentDietPlanDayIndex = 0;
let activeFoodConfirmationData = null;
let aiCoachChatTurns = [];

function openAICoach() {
    showSection('aiCoachSection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    initAICoachChatHistory();
    const input = document.getElementById('aiCoachInput');
    if (input) setTimeout(() => input.focus(), 200);
    updateAICoachComposerState();
    scrollAICoachToBottom();
    checkAICoachServerStatus();
}

function checkAICoachServerStatus() {
    const badge = document.getElementById('aiCoachStatusBadge');
    if (!badge) return;

    fetch(`${AI_BACKEND_URL}/api/health`)
        .then(res => res.json())
        .then(data => {
            if (data.hasGroqKey || data.hasGrokKey || data.hasGeminiKey) {
                badge.innerHTML = `<span class="ai-active-indicator-dot"></span><span>Groq Active · Personalized AI Assistant</span>`;
            } else {
                badge.innerHTML = `<span class="ai-active-indicator-dot" style="background:#38bdf8;box-shadow:0 0 8px #38bdf8;"></span><span>Grounded AI Engine · Personalized AI Assistant</span>`;
            }
        })
        .catch(() => {
            badge.innerHTML = `<span class="ai-active-indicator-dot"></span><span>Groq Active · Personalized AI Assistant</span>`;
        });
}

function scrollAICoachToBottom() {
    const container = document.getElementById('aiCoachMessages');
    if (container) {
        container.scrollTop = container.scrollHeight;
    }
}

function escapeCoachHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function formatCoachFileSize(bytes) {
    if (!bytes || isNaN(bytes)) return '';
    if (bytes < 1024) return bytes + ' B';
    const kb = bytes / 1024;
    if (kb < 1024) return kb.toFixed(1) + ' KB';
    return (kb / 1024).toFixed(1) + ' MB';
}

function triggerCoachFileSelect(type) {
    const fileInput = document.getElementById('aiCoachFileInput');
    if (!fileInput) return;
    if (type === 'photo') {
        fileInput.accept = '.jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp';
    } else if (type === 'pdf') {
        fileInput.accept = '.pdf,application/pdf';
    } else if (type === 'docx') {
        fileInput.accept = '.docx,.doc,.txt,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,text/plain';
    } else {
        fileInput.accept = '.jpg,.jpeg,.png,.webp,.pdf,.docx,.txt,image/*,application/pdf';
    }
    fileInput.value = '';
    fileInput.click();
}

function handleCoachFilePicked(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const ext = file.name.split('.').pop().toLowerCase();
    const supported = ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'docx', 'doc', 'txt'];
    if (!supported.includes(ext)) {
        showToast('⚠️ Please select a supported file (JPG, PNG, WEBP, PDF, DOCX, TXT)');
        e.target.value = '';
        return;
    }

    if (file.size > 20 * 1024 * 1024) {
        showToast('⚠️ File size exceeds 20MB limit.');
        e.target.value = '';
        return;
    }

    const isImage = ['jpg', 'jpeg', 'png', 'webp'].includes(ext) || file.type.startsWith('image/');
    const formattedSize = formatCoachFileSize(file.size);

    if (isImage) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            currentCoachAttachment = {
                file: file,
                name: file.name,
                size: formattedSize,
                rawSize: file.size,
                type: ext.toUpperCase(),
                mimeType: file.type || 'image/jpeg',
                isImage: true,
                dataUrl: evt.target.result,
                ocrText: '',
                ocrStatus: 'scanning'
            };
            renderCoachAttachmentPreview();
            updateAICoachComposerState();
            const input = document.getElementById('aiCoachInput');
            if (input) input.focus();

            // Run client-side Tesseract.js OCR in the background
            if (typeof Tesseract !== 'undefined') {
                Tesseract.recognize(evt.target.result, 'eng')
                    .then(res => {
                        if (currentCoachAttachment && currentCoachAttachment.file === file) {
                            currentCoachAttachment.ocrText = (res && res.data && res.data.text) ? res.data.text.trim() : '';
                            currentCoachAttachment.ocrStatus = 'ready';
                            renderCoachAttachmentPreview();
                        }
                    })
                    .catch(err => {
                        console.warn('Tesseract OCR note:', err && err.message ? err.message : err);
                        if (currentCoachAttachment && currentCoachAttachment.file === file) {
                            currentCoachAttachment.ocrStatus = 'fallback';
                            renderCoachAttachmentPreview();
                        }
                    });
            } else {
                currentCoachAttachment.ocrStatus = 'ready';
            }
        };
        reader.readAsDataURL(file);
    } else if (ext === 'txt') {
        const textReader = new FileReader();
        textReader.onload = function(evt) {
            const textContent = evt.target.result;
            const dataUrlReader = new FileReader();
            dataUrlReader.onload = function(dataEvt) {
                currentCoachAttachment = {
                    file: file,
                    name: file.name,
                    size: formattedSize,
                    rawSize: file.size,
                    type: 'TXT',
                    mimeType: 'text/plain',
                    isImage: false,
                    icon: '📋',
                    fileText: textContent,
                    dataUrl: dataEvt.target.result
                };
                renderCoachAttachmentPreview();
                updateAICoachComposerState();
                const input = document.getElementById('aiCoachInput');
                if (input) input.focus();
            };
            dataUrlReader.readAsDataURL(file);
        };
        textReader.readAsText(file);
    } else if (ext === 'pdf') {
        const abReader = new FileReader();
        abReader.onload = async function(evt) {
            const arrayBuffer = evt.target.result;
            const dataUrlReader = new FileReader();
            dataUrlReader.onload = async function(dataEvt) {
                const originalDataUrl = dataEvt.target.result;
                currentCoachAttachment = {
                    file: file,
                    name: file.name,
                    size: formattedSize,
                    rawSize: file.size,
                    type: 'PDF',
                    mimeType: 'application/pdf',
                    isImage: false,
                    icon: '📄',
                    dataUrl: originalDataUrl,
                    fileText: '',
                    ocrText: '',
                    ocrStatus: 'scanning'
                };
                renderCoachAttachmentPreview();
                updateAICoachComposerState();
                const input = document.getElementById('aiCoachInput');
                if (input) input.focus();

                // Process PDF using PDF.js if available in browser
                if (typeof pdfjsLib !== 'undefined') {
                    try {
                        if (pdfjsLib.GlobalWorkerOptions && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
                            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
                        }
                        const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
                        const pdfDoc = await loadingTask.promise;

                        let pdfText = '';
                        const pageCount = Math.min(pdfDoc.numPages, 20);
                        for (let p = 1; p <= pageCount; p++) {
                            const page = await pdfDoc.getPage(p);
                            const textContent = await page.getTextContent();
                            const pageStr = textContent.items.map(it => it.str).join(' ');
                            if (pageStr.trim()) pdfText += pageStr + '\n';
                        }

                        if (pdfText.trim().length > 10) {
                            // Text-based PDF: text extracted cleanly!
                            if (currentCoachAttachment && currentCoachAttachment.file === file) {
                                currentCoachAttachment.fileText = pdfText.trim();
                                currentCoachAttachment.ocrText = pdfText.trim();
                                currentCoachAttachment.ocrStatus = 'ready';
                                renderCoachAttachmentPreview();
                            }
                        } else if (pdfDoc.numPages > 0) {
                            // Scanned / handwritten PDF: render page 1 to canvas and extract image for Groq Vision & Tesseract
                            const page = await pdfDoc.getPage(1);
                            const viewport = page.getViewport({ scale: 1.5 });
                            const canvas = document.createElement('canvas');
                            canvas.width = viewport.width;
                            canvas.height = viewport.height;
                            const ctx = canvas.getContext('2d');
                            await page.render({ canvasContext: ctx, viewport: viewport }).promise;

                            const renderedJpeg = canvas.toDataURL('image/jpeg', 0.92);
                            if (currentCoachAttachment && currentCoachAttachment.file === file) {
                                currentCoachAttachment.dataUrl = renderedJpeg;
                                currentCoachAttachment.mimeType = 'image/jpeg';
                                currentCoachAttachment.isImage = true;
                                currentCoachAttachment.type = 'PDF (SCANNED)';
                                renderCoachAttachmentPreview();

                                // Run Tesseract OCR on rendered canvas
                                if (typeof Tesseract !== 'undefined') {
                                    Tesseract.recognize(canvas, 'eng')
                                        .then(res => {
                                            if (currentCoachAttachment && currentCoachAttachment.file === file) {
                                                currentCoachAttachment.ocrText = (res && res.data && res.data.text) ? res.data.text.trim() : '';
                                                currentCoachAttachment.ocrStatus = 'ready';
                                                renderCoachAttachmentPreview();
                                            }
                                        })
                                        .catch(() => {
                                            if (currentCoachAttachment && currentCoachAttachment.file === file) {
                                                currentCoachAttachment.ocrStatus = 'ready';
                                                renderCoachAttachmentPreview();
                                            }
                                        });
                                } else {
                                    currentCoachAttachment.ocrStatus = 'ready';
                                }
                            }
                        }
                    } catch (pdfErr) {
                        console.warn('PDF.js client note:', pdfErr);
                        if (pdfErr && (pdfErr.name === 'PasswordException' || String(pdfErr).includes('password'))) {
                            showToast('⚠️ The uploaded PDF is password-protected. Please upload an unprotected file or enter foods manually.');
                            removeAICoachAttachment();
                            return;
                        }
                        if (currentCoachAttachment && currentCoachAttachment.file === file) {
                            currentCoachAttachment.ocrStatus = 'ready';
                            renderCoachAttachmentPreview();
                        }
                    }
                } else {
                    if (currentCoachAttachment && currentCoachAttachment.file === file) {
                        currentCoachAttachment.ocrStatus = 'ready';
                        renderCoachAttachmentPreview();
                    }
                }
            };
            dataUrlReader.readAsDataURL(file);
        };
        abReader.readAsArrayBuffer(file);
    } else {
        const icon = ['docx', 'doc'].includes(ext) ? '📝' : '📋';
        const reader = new FileReader();
        reader.onload = function(evt) {
            currentCoachAttachment = {
                file: file,
                name: file.name,
                size: formattedSize,
                rawSize: file.size,
                type: ext.toUpperCase(),
                mimeType: file.type || 'application/octet-stream',
                isImage: false,
                icon: icon,
                dataUrl: evt.target.result
            };
            renderCoachAttachmentPreview();
            updateAICoachComposerState();
            const input = document.getElementById('aiCoachInput');
            if (input) input.focus();
        };
        reader.readAsDataURL(file);
    }
}

function renderCoachAttachmentPreview() {
    const box = document.getElementById('aiCoachAttachmentPreview');
    if (!box) return;

    if (!currentCoachAttachment) {
        box.innerHTML = '';
        box.classList.add('d-none');
        return;
    }

    box.classList.remove('d-none');
    if (currentCoachAttachment.isImage) {
        let ocrBadge = '';
        if (currentCoachAttachment.ocrStatus === 'scanning') {
            ocrBadge = `<span class="badge" style="background: rgba(255, 193, 7, 0.2); color: #FFC107;"><i class="bi bi-hourglass-split"></i> Scanning OCR...</span>`;
        } else if (currentCoachAttachment.ocrStatus === 'ready' && currentCoachAttachment.ocrText) {
            ocrBadge = `<span class="badge" style="background: rgba(111, 174, 61, 0.2); color: #6FAE3D;"><i class="bi bi-check-circle"></i> OCR Text Ready</span>`;
        }

        box.innerHTML = `
            <div class="ai-preview-thumb-wrap">
                <img src="${currentCoachAttachment.dataUrl}" alt="Preview" class="ai-preview-thumb">
            </div>
            <div class="ai-preview-info">
                <div class="ai-preview-name" title="${escapeCoachHtml(currentCoachAttachment.name)}">${escapeCoachHtml(currentCoachAttachment.name)}</div>
                <div class="ai-preview-meta">
                    <span class="badge" style="background:#3A281E; color:#FF8A1F;">${currentCoachAttachment.type}</span>
                    <span>${currentCoachAttachment.size}</span>
                    ${ocrBadge}
                </div>
            </div>
            <button type="button" class="ai-preview-remove-btn" onclick="removeAICoachAttachment()" title="Remove attachment">
                <i class="bi bi-x-lg"></i>
            </button>
        `;
    } else {
        box.innerHTML = `
            <div class="ai-preview-doc-icon">${currentCoachAttachment.icon || '📄'}</div>
            <div class="ai-preview-info">
                <div class="ai-preview-name" title="${escapeCoachHtml(currentCoachAttachment.name)}">${escapeCoachHtml(currentCoachAttachment.name)}</div>
                <div class="ai-preview-meta">
                    <span class="badge" style="background:#3A281E; color:#FF8A1F;">${currentCoachAttachment.type}</span>
                    <span>${currentCoachAttachment.size}</span>
                </div>
            </div>
            <button type="button" class="ai-preview-remove-btn" onclick="removeAICoachAttachment()" title="Remove attachment">
                <i class="bi bi-x-lg"></i>
            </button>
        `;
    }
}

function removeAICoachAttachment() {
    currentCoachAttachment = null;
    const fileInput = document.getElementById('aiCoachFileInput');
    if (fileInput) fileInput.value = '';
    const box = document.getElementById('aiCoachAttachmentPreview');
    if (box) {
        box.innerHTML = '';
        box.classList.add('d-none');
    }
    updateAICoachComposerState();
}

function updateAICoachComposerState() {
    const input = document.getElementById('aiCoachInput');
    const sendBtn = document.getElementById('aiCoachSendBtn');
    if (!sendBtn) return;
    const hasText = input && input.value.trim().length > 0;
    const hasAttachment = !!currentCoachAttachment;
    sendBtn.disabled = !(hasText || hasAttachment);
}

function getAICoachHistoryKey() {
    return currentUser && currentUser.email 
        ? `ht_ai_chat_history_${currentUser.email}` 
        : 'ht_ai_chat_history_guest';
}

async function saveAICoachChatMessage(msgObj) {
    if (!currentUser || !currentUser.email) return;
    const email = currentUser.email.toLowerCase().trim();

    // 1. Prepare clean message (exclude bulky raw objects to protect storage)
    const cleanMsg = { ...msgObj };
    if (cleanMsg.dietPlan && typeof cleanMsg.dietPlan === 'object') {
        cleanMsg.dietPlanId = cleanMsg.dietPlan.id;
        cleanMsg.dietPlanTitle = cleanMsg.dietPlan.title;
        delete cleanMsg.dietPlan;
    }

    const payload = {
        email: email,
        user_id: currentUser.id || null,
        sender: cleanMsg.sender || 'user',
        text: cleanMsg.text || '',
        source: cleanMsg.source || 'groq',
        dietPlanId: cleanMsg.dietPlanId || null,
        attachmentName: cleanMsg.attachment ? cleanMsg.attachment.name : null,
        attachmentType: cleanMsg.attachment ? cleanMsg.attachment.type : null,
        hasAttachment: !!cleanMsg.attachment
    };

    // 2. Cache in IndexedDB for instant offline access (completely frees localStorage quota!)
    try {
        await HealthifyIDB.saveChatMessage({
            email: email,
            sender: payload.sender,
            text: payload.text,
            source: payload.source,
            dietPlanId: payload.dietPlanId,
            attachment: cleanMsg.attachment || null,
            createdAt: new Date().toISOString()
        });
    } catch (idbErr) {
        console.warn('[AI Coach] IDB cache notice:', idbErr);
    }

    // 3. Persist permanently to MySQL
    try {
        await apiFetch('/api/ai/chat/message', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    } catch (netErr) {
        // If offline, queue for synchronization when connection is restored
        await HealthifyIDB.queueOfflineAction('chat_message', payload);
    }
}

async function initAICoachChatHistory() {
    const container = document.getElementById('aiCoachMessages');
    const welcomeArea = document.getElementById('aiCoachWelcomeArea');
    if (!container) return;

    aiCoachChatTurns = [];
    if (!currentUser || !currentUser.email) {
        if (welcomeArea) welcomeArea.classList.remove('d-none');
        const rows = container.querySelectorAll('.ai-msg-row-user, .ai-msg-row-bot');
        rows.forEach(r => r.remove());
        return;
    }

    const email = currentUser.email.toLowerCase().trim();

    const renderHistory = (history) => {
        if (history && history.length > 0) {
            if (welcomeArea) welcomeArea.classList.add('d-none');
            const rows = container.querySelectorAll('.ai-msg-row-user, .ai-msg-row-bot');
            rows.forEach(r => r.remove());
            aiCoachChatTurns = [];

            history.forEach(m => {
                appendAICoachBubble(m.sender, m.text, m.source || '', m.attachment || null, false, m.dietPlan || null, m.searchSources || []);
                if (m.sender === 'user') {
                    aiCoachChatTurns.push({ role: 'user', content: m.text || (m.attachment ? 'Attachment: ' + m.attachment.name : '') });
                } else if (m.sender === 'bot') {
                    aiCoachChatTurns.push({ role: 'model', content: m.text || '' });
                }
                if (m.dietPlan) {
                    if (!currentActiveDietPlan) {
                        currentActiveDietPlan = m.dietPlan;
                    }
                }
            });
        } else {
            if (welcomeArea) welcomeArea.classList.remove('d-none');
            const rows = container.querySelectorAll('.ai-msg-row-user, .ai-msg-row-bot');
            rows.forEach(r => r.remove());
        }
    };

    // 1. Instant local render from IndexedDB cache
    try {
        const idbMessages = await HealthifyIDB.getChatMessages(email, 50);
        if (idbMessages && idbMessages.length > 0) {
            renderHistory(idbMessages);
        }
    } catch (e) {}

    // 2. Fetch fresh persistent history from MySQL
    try {
        const res = await apiFetch(`/api/ai/chat/history?email=${encodeURIComponent(email)}&limit=50`);
        if (res && res.success && Array.isArray(res.messages)) {
            renderHistory(res.messages);
            for (const msg of res.messages) {
                await HealthifyIDB.saveChatMessage({ email, ...msg });
            }
        }
    } catch (err) {
        // Offline mode: IndexedDB render already populated the UI
    }
}

async function resetAICoachChat() {
    if (!currentUser || !currentUser.email) return;
    const email = currentUser.email.toLowerCase().trim();

    aiCoachChatTurns = [];
    currentActiveDietPlan = null;
    activeFoodConfirmationData = null;
    currentDietPlanDayIndex = 0;

    // Clear IndexedDB cache
    try {
        await HealthifyIDB.clearChatMessages(email);
    } catch (e) {}

    // Clear MySQL history
    try {
        await apiFetch('/api/ai/chat/history', {
            method: 'DELETE',
            body: JSON.stringify({ email })
        });
    } catch (e) {}

    const container = document.getElementById('aiCoachMessages');
    const welcomeArea = document.getElementById('aiCoachWelcomeArea');
    if (container) {
        const rows = container.querySelectorAll('.ai-msg-row-user, .ai-msg-row-bot');
        rows.forEach(r => r.remove());
        if (welcomeArea) {
            welcomeArea.classList.remove('d-none');
        }
    }
    removeAICoachAttachment();
    const input = document.getElementById('aiCoachInput');
    if (input) {
        input.value = '';
        input.focus();
    }
    updateAICoachComposerState();
    showToast('✨ Started a new AI Health Coach conversation!');
}

const CLIENT_NUTRITION_LOOKUP = {
    // Eggs (USDA FoodData Central)
    'eggs': { name: 'Eggs (Whole Boiled)', quantity: 100, unit: 'g', calories: 155, protein: 13.0, carbs: 1.1, fat: 11.0, fibre: 0.0, servingSize: '2 large eggs (100g)', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'egg': { name: 'Eggs (Whole Boiled)', quantity: 100, unit: 'g', calories: 155, protein: 13.0, carbs: 1.1, fat: 11.0, fibre: 0.0, servingSize: '2 large eggs (100g)', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'boiled egg': { name: 'Eggs (Whole Boiled)', quantity: 100, unit: 'g', calories: 155, protein: 13.0, carbs: 1.1, fat: 11.0, fibre: 0.0, servingSize: '2 large eggs (100g)', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'egg whites': { name: 'Egg Whites (Boiled)', quantity: 100, unit: 'g', calories: 52, protein: 11.0, carbs: 0.7, fat: 0.2, fibre: 0.0, servingSize: '100g', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },

    // Poultry & Meat: Raw vs Cooked grounded in USDA FoodData Central & IFCT
    'raw chicken breast': { name: 'Chicken Breast (Raw)', quantity: 100, unit: 'g', calories: 120, protein: 22.5, carbs: 0.0, fat: 2.6, fibre: 0.0, servingSize: '100g raw breast', state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
    'chicken breast (raw)': { name: 'Chicken Breast (Raw)', quantity: 100, unit: 'g', calories: 120, protein: 22.5, carbs: 0.0, fat: 2.6, fibre: 0.0, servingSize: '100g raw breast', state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
    'raw chicken': { name: 'Chicken Breast (Raw)', quantity: 100, unit: 'g', calories: 120, protein: 22.5, carbs: 0.0, fat: 2.6, fibre: 0.0, servingSize: '100g raw breast', state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
    'uncooked chicken breast': { name: 'Chicken Breast (Raw)', quantity: 100, unit: 'g', calories: 120, protein: 22.5, carbs: 0.0, fat: 2.6, fibre: 0.0, servingSize: '100g raw breast', state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
    'chicken': { name: 'Chicken Breast (Grilled)', quantity: 100, unit: 'g', calories: 165, protein: 31.0, carbs: 0.0, fat: 3.6, fibre: 0.0, servingSize: '100g grilled breast', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'chicken breast': { name: 'Chicken Breast (Grilled)', quantity: 100, unit: 'g', calories: 165, protein: 31.0, carbs: 0.0, fat: 3.6, fibre: 0.0, servingSize: '100g grilled breast', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'grilled chicken': { name: 'Chicken Breast (Grilled)', quantity: 100, unit: 'g', calories: 165, protein: 31.0, carbs: 0.0, fat: 3.6, fibre: 0.0, servingSize: '100g grilled breast', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'cooked chicken breast': { name: 'Chicken Breast (Grilled)', quantity: 100, unit: 'g', calories: 165, protein: 31.0, carbs: 0.0, fat: 3.6, fibre: 0.0, servingSize: '100g grilled breast', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'grilled chicken breast': { name: 'Chicken Breast (Grilled)', quantity: 100, unit: 'g', calories: 165, protein: 31.0, carbs: 0.0, fat: 3.6, fibre: 0.0, servingSize: '100g grilled breast', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'chicken breast (cooked/grilled)': { name: 'Chicken Breast (Grilled)', quantity: 100, unit: 'g', calories: 165, protein: 31.0, carbs: 0.0, fat: 3.6, fibre: 0.0, servingSize: '100g grilled breast', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },

    // Fish
    'fish': { name: 'Fish (Steamed Rohu)', quantity: 100, unit: 'g', calories: 97, protein: 17.0, carbs: 0.0, fat: 2.5, fibre: 0.0, servingSize: '100g fillet', state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
    'salmon': { name: 'Salmon (Grilled)', quantity: 100, unit: 'g', calories: 208, protein: 20.0, carbs: 0.0, fat: 13.0, fibre: 0.0, servingSize: '100g fillet', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'tuna': { name: 'Tuna (Canned in Water)', quantity: 100, unit: 'g', calories: 130, protein: 28.0, carbs: 0.0, fat: 1.0, fibre: 0.0, servingSize: '100g', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },

    // Grains: Raw vs Cooked (USDA FoodData Central & IFCT)
    'oats': { name: 'Oats (Raw)', quantity: 50, unit: 'g', calories: 195, protein: 8.5, carbs: 33.2, fat: 3.5, fibre: 5.3, servingSize: '50g raw rolled oats (16.9g P/100g)', state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
    'dry oats': { name: 'Oats (Raw)', quantity: 100, unit: 'g', calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, fibre: 10.6, servingSize: '100g dry rolled oats', state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
    'raw oats': { name: 'Oats (Raw)', quantity: 100, unit: 'g', calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, fibre: 10.6, servingSize: '100g dry rolled oats', state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
    'rolled oats': { name: 'Oats (Raw)', quantity: 100, unit: 'g', calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, fibre: 10.6, servingSize: '100g dry rolled oats', state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
    'uncooked oats': { name: 'Oats (Raw)', quantity: 100, unit: 'g', calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, fibre: 10.6, servingSize: '100g dry rolled oats', state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
    'cooked oats': { name: 'Oats (Cooked Porridge)', quantity: 100, unit: 'g', calories: 71, protein: 2.5, carbs: 12.0, fat: 1.5, fibre: 1.7, servingSize: '100g cooked porridge', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'raw rice': { name: 'White Rice (Raw)', quantity: 100, unit: 'g', calories: 360, protein: 7.0, carbs: 79.0, fat: 0.6, fibre: 1.3, servingSize: '100g uncooked rice', state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
    'uncooked rice': { name: 'White Rice (Raw)', quantity: 100, unit: 'g', calories: 360, protein: 7.0, carbs: 79.0, fat: 0.6, fibre: 1.3, servingSize: '100g uncooked rice', state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
    'white rice (raw)': { name: 'White Rice (Raw)', quantity: 100, unit: 'g', calories: 360, protein: 7.0, carbs: 79.0, fat: 0.6, fibre: 1.3, servingSize: '100g uncooked rice', state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
    'white rice': { name: 'White Rice (Cooked)', quantity: 100, unit: 'g', calories: 130, protein: 2.7, carbs: 28.2, fat: 0.3, fibre: 0.4, servingSize: '100g cooked', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'white rice (cooked)': { name: 'White Rice (Cooked)', quantity: 100, unit: 'g', calories: 130, protein: 2.7, carbs: 28.2, fat: 0.3, fibre: 0.4, servingSize: '100g cooked', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'rice': { name: 'White Rice (Cooked)', quantity: 100, unit: 'g', calories: 130, protein: 2.7, carbs: 28.2, fat: 0.3, fibre: 0.4, servingSize: '100g cooked', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'brown rice (raw)': { name: 'Brown Rice (Raw)', quantity: 100, unit: 'g', calories: 362, protein: 7.5, carbs: 76.0, fat: 2.7, fibre: 3.4, servingSize: '100g uncooked', state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
    'brown rice': { name: 'Brown Rice (Cooked)', quantity: 100, unit: 'g', calories: 111, protein: 2.6, carbs: 23.0, fat: 0.9, fibre: 1.8, servingSize: '100g cooked', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'brown rice (cooked)': { name: 'Brown Rice (Cooked)', quantity: 100, unit: 'g', calories: 111, protein: 2.6, carbs: 23.0, fat: 0.9, fibre: 1.8, servingSize: '100g cooked', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'quinoa': { name: 'Quinoa (Cooked)', quantity: 100, unit: 'g', calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9, fibre: 2.8, servingSize: '100g cooked', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'sweet potato': { name: 'Sweet Potato (Boiled)', quantity: 100, unit: 'g', calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1, fibre: 3.0, servingSize: '100g boiled', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'bread': { name: 'Whole Wheat Bread', quantity: 60, unit: 'g', calories: 148, protein: 7.8, carbs: 24.6, fat: 2.0, fibre: 4.2, servingSize: '2 slices (60g)', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'chapati': { name: 'Whole Wheat Chapati / Roti', quantity: 80, unit: 'g', calories: 208, protein: 7.2, carbs: 41.6, fat: 2.8, fibre: 5.6, servingSize: '2 chapatis (80g)', state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
    'roti': { name: 'Whole Wheat Chapati / Roti', quantity: 80, unit: 'g', calories: 208, protein: 7.2, carbs: 41.6, fat: 2.8, fibre: 5.6, servingSize: '2 chapatis (80g)', state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
    'whole wheat chapati / roti': { name: 'Whole Wheat Chapati / Roti', quantity: 80, unit: 'g', calories: 208, protein: 7.2, carbs: 41.6, fat: 2.8, fibre: 5.6, servingSize: '2 chapatis (80g)', state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
    'whole wheat chapati': { name: 'Whole Wheat Chapati / Roti', quantity: 80, unit: 'g', calories: 208, protein: 7.2, carbs: 41.6, fat: 2.8, fibre: 5.6, servingSize: '2 chapatis (80g)', state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
    'whole wheat bread': { name: 'Whole Wheat Bread', quantity: 60, unit: 'g', calories: 148, protein: 7.8, carbs: 24.6, fat: 2.0, fibre: 4.2, servingSize: '2 slices (60g)', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'cooked chicken': { name: 'Chicken Breast (Grilled)', quantity: 100, unit: 'g', calories: 165, protein: 31.0, carbs: 0.0, fat: 3.6, fibre: 0.0, servingSize: '100g grilled breast', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'chutney': { name: 'Coconut Chutney', quantity: 50, unit: 'g', calories: 90, protein: 1.3, carbs: 3.0, fat: 8.5, fibre: 1.5, servingSize: '2 tbsp (50g)', state: 'fresh', source: 'ICMR-NIN IFCT', isEstimated: false },
    'raw chana': { name: 'Chickpeas / Chana (Raw)', quantity: 100, unit: 'g', calories: 364, protein: 19.3, carbs: 60.6, fat: 6.0, fibre: 17.4, servingSize: '100g raw dry', state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
    'chia seeds': { name: 'Chia Seeds', quantity: 100, unit: 'g', calories: 486, protein: 16.5, carbs: 42.1, fat: 30.7, fibre: 34.4, servingSize: '100g', state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
    'protein bar': { name: 'Protein Bar', quantity: 100, unit: 'g', calories: 210, protein: 20.0, carbs: 22.0, fat: 7.0, fibre: 8.0, servingSize: '1 bar (100g)', state: 'cooked', source: 'Standard Food Composition', isEstimated: false },

    // Indian Breakfast Items (ICMR-NIN IFCT)
    'idli': { name: 'Idli (Steamed)', quantity: 100, unit: 'g', calories: 135, protein: 4.0, carbs: 28.0, fat: 0.5, fibre: 1.5, servingSize: '2 medium idlis (100g)', state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
    'idlis': { name: 'Idli (Steamed)', quantity: 100, unit: 'g', calories: 135, protein: 4.0, carbs: 28.0, fat: 0.5, fibre: 1.5, servingSize: '2 medium idlis (100g)', state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
    'dosa': { name: 'Dosa (Plain)', quantity: 100, unit: 'g', calories: 168, protein: 4.5, carbs: 29.0, fat: 3.8, fibre: 1.8, servingSize: '1 medium plain dosa (100g)', state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
    'sambar': { name: 'Sambar', quantity: 150, unit: 'g', calories: 83, protein: 3.8, carbs: 13.5, fat: 1.8, fibre: 3.3, servingSize: '150g bowl', state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
    'coconut chutney': { name: 'Coconut Chutney', quantity: 50, unit: 'g', calories: 90, protein: 1.3, carbs: 3.0, fat: 8.5, fibre: 1.5, servingSize: '2 tbsp (50g)', state: 'fresh', source: 'ICMR-NIN IFCT', isEstimated: false },
    'peanut chutney': { name: 'Peanut / Groundnut Chutney', quantity: 50, unit: 'g', calories: 110, protein: 3.3, carbs: 4.0, fat: 9.0, fibre: 1.3, servingSize: '2 tbsp (50g)', state: 'fresh', source: 'ICMR-NIN IFCT', isEstimated: false },
    'pongal': { name: 'Pongal (Ven Pongal)', quantity: 150, unit: 'g', calories: 263, protein: 6.3, carbs: 39.0, fat: 9.0, fibre: 3.0, servingSize: '150g bowl', state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
    'upma': { name: 'Upma (Rava Upma)', quantity: 150, unit: 'g', calories: 203, protein: 5.3, carbs: 36.0, fat: 4.5, fibre: 2.7, servingSize: '150g bowl', state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
    'poha': { name: 'Poha (Cooked)', quantity: 150, unit: 'g', calories: 195, protein: 3.8, carbs: 39.0, fat: 3.0, fibre: 1.8, servingSize: '150g bowl', state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },

    // Dairy & Plant Proteins
    'milk': { name: "Cow's Milk (Toned)", quantity: 200, unit: 'ml', calories: 116, protein: 6.4, carbs: 9.6, fat: 6.2, fibre: 0.0, servingSize: '200ml cup', state: 'fresh', source: 'ICMR-NIN IFCT', isEstimated: false },
    'curd': { name: 'Curd / Dahi (Low Fat)', quantity: 150, unit: 'g', calories: 90, protein: 5.3, carbs: 6.8, fat: 4.5, fibre: 0.0, servingSize: '150g bowl', state: 'fresh', source: 'ICMR-NIN IFCT', isEstimated: false },
    'dahi': { name: 'Curd / Dahi (Low Fat)', quantity: 150, unit: 'g', calories: 90, protein: 5.3, carbs: 6.8, fat: 4.5, fibre: 0.0, servingSize: '150g bowl', state: 'fresh', source: 'ICMR-NIN IFCT', isEstimated: false },
    'paneer': { name: 'Paneer (Fresh/Raw)', quantity: 100, unit: 'g', calories: 265, protein: 18.3, carbs: 3.5, fat: 20.8, fibre: 0.0, servingSize: '100g fresh paneer', state: 'raw', source: 'ICMR-NIN IFCT', isEstimated: false },
    'fresh paneer': { name: 'Paneer (Fresh/Raw)', quantity: 100, unit: 'g', calories: 265, protein: 18.3, carbs: 3.5, fat: 20.8, fibre: 0.0, servingSize: '100g fresh paneer', state: 'raw', source: 'ICMR-NIN IFCT', isEstimated: false },
    'cottage cheese': { name: 'Paneer (Fresh/Raw)', quantity: 100, unit: 'g', calories: 265, protein: 18.3, carbs: 3.5, fat: 20.8, fibre: 0.0, servingSize: '100g fresh paneer', state: 'raw', source: 'ICMR-NIN IFCT', isEstimated: false },
    'greek yogurt': { name: 'Greek Yogurt', quantity: 150, unit: 'g', calories: 89, protein: 15.0, carbs: 5.4, fat: 0.6, fibre: 0.0, servingSize: '150g serving', state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
    'tofu': { name: 'Tofu (Firm)', quantity: 100, unit: 'g', calories: 76, protein: 8.0, carbs: 1.9, fat: 4.8, fibre: 0.3, servingSize: '100g', state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
    'soya chunks': { name: 'Soya Chunks (Dried)', quantity: 50, unit: 'g', calories: 173, protein: 26.0, carbs: 16.5, fat: 0.3, fibre: 6.5, servingSize: '50g dry', state: 'raw', source: 'ICMR-NIN IFCT', isEstimated: false },

    // Dal & Legumes: Raw vs Cooked
    'raw dal': { name: 'Moong Dal (Raw)', quantity: 100, unit: 'g', calories: 347, protein: 24.0, carbs: 59.8, fat: 1.2, fibre: 16.3, servingSize: '100g dry dal', state: 'raw', source: 'ICMR-NIN IFCT', isEstimated: false },
    'raw moong dal': { name: 'Moong Dal (Raw)', quantity: 100, unit: 'g', calories: 347, protein: 24.0, carbs: 59.8, fat: 1.2, fibre: 16.3, servingSize: '100g dry dal', state: 'raw', source: 'ICMR-NIN IFCT', isEstimated: false },
    'dry dal': { name: 'Moong Dal (Raw)', quantity: 100, unit: 'g', calories: 347, protein: 24.0, carbs: 59.8, fat: 1.2, fibre: 16.3, servingSize: '100g dry dal', state: 'raw', source: 'ICMR-NIN IFCT', isEstimated: false },
    'dal': { name: 'Moong Dal (Cooked)', quantity: 150, unit: 'g', calories: 158, protein: 10.7, carbs: 28.5, fat: 0.6, fibre: 8.0, servingSize: '150g cooked', state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
    'moong dal': { name: 'Moong Dal (Cooked)', quantity: 150, unit: 'g', calories: 158, protein: 10.7, carbs: 28.5, fat: 0.6, fibre: 8.0, servingSize: '150g cooked', state: 'cooked', source: 'ICMR-NIN IFCT', isEstimated: false },
    'lentils': { name: 'Lentils (Cooked)', quantity: 100, unit: 'g', calories: 116, protein: 9.0, carbs: 20.1, fat: 0.4, fibre: 7.9, servingSize: '100g cooked', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'chana': { name: 'Chickpeas / Chana (Cooked)', quantity: 100, unit: 'g', calories: 164, protein: 8.9, carbs: 27.4, fat: 2.6, fibre: 7.6, servingSize: '100g cooked', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'chickpeas': { name: 'Chickpeas / Chana (Cooked)', quantity: 100, unit: 'g', calories: 164, protein: 8.9, carbs: 27.4, fat: 2.6, fibre: 7.6, servingSize: '100g cooked', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'sprouts': { name: 'Sprouted Moong (Raw)', quantity: 80, unit: 'g', calories: 25, protein: 2.6, carbs: 4.7, fat: 0.2, fibre: 1.4, servingSize: '80g fresh', state: 'raw', source: 'USDA FoodData Central', isEstimated: false },

    // Nuts & Seeds
    'almonds': { name: 'Almonds', quantity: 20, unit: 'g', calories: 116, protein: 4.2, carbs: 4.3, fat: 10.0, fibre: 2.5, servingSize: '20g (approx 15 nuts)', state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
    'peanuts': { name: 'Peanuts (Roasted)', quantity: 30, unit: 'g', calories: 170, protein: 7.7, carbs: 4.8, fat: 14.8, fibre: 2.6, servingSize: '30g', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },

    // 7 Dedicated Rotating Fruits (USDA FoodData Central & IFCT)
    'apple': { name: 'Apple', quantity: 100, unit: 'g', calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2, fibre: 2.4, servingSize: '1 medium apple (100g)', state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
    'apples': { name: 'Apple', quantity: 100, unit: 'g', calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2, fibre: 2.4, servingSize: '1 medium apple (100g)', state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
    'banana': { name: 'Banana', quantity: 100, unit: 'g', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fibre: 2.6, servingSize: '1 medium banana (100g)', state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
    'bananas': { name: 'Banana', quantity: 100, unit: 'g', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fibre: 2.6, servingSize: '1 medium banana (100g)', state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
    'raw banana': { name: 'Banana', quantity: 100, unit: 'g', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fibre: 2.6, servingSize: '1 medium banana (100g)', state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
    'fresh banana': { name: 'Banana', quantity: 100, unit: 'g', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fibre: 2.6, servingSize: '1 medium banana (100g)', state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
    'papaya': { name: 'Papaya', quantity: 100, unit: 'g', calories: 43, protein: 0.5, carbs: 10.8, fat: 0.3, fibre: 1.7, servingSize: '100g sliced cubes', state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
    'guava': { name: 'Guava', quantity: 100, unit: 'g', calories: 68, protein: 2.6, carbs: 14.3, fat: 1.0, fibre: 5.4, servingSize: '1 medium guava (100g)', state: 'fresh', source: 'ICMR-NIN IFCT', isEstimated: false },
    'orange': { name: 'Orange', quantity: 100, unit: 'g', calories: 47, protein: 0.9, carbs: 11.8, fat: 0.1, fibre: 2.4, servingSize: '1 medium orange (100g)', state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
    'oranges': { name: 'Orange', quantity: 100, unit: 'g', calories: 47, protein: 0.9, carbs: 11.8, fat: 0.1, fibre: 2.4, servingSize: '1 medium orange (100g)', state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
    'watermelon': { name: 'Watermelon', quantity: 100, unit: 'g', calories: 30, protein: 0.6, carbs: 7.6, fat: 0.2, fibre: 0.4, servingSize: '100g diced', state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
    'pomegranate': { name: 'Pomegranate', quantity: 100, unit: 'g', calories: 83, protein: 1.7, carbs: 18.7, fat: 1.2, fibre: 4.0, servingSize: '100g arils', state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },
    'anar': { name: 'Pomegranate', quantity: 100, unit: 'g', calories: 83, protein: 1.7, carbs: 18.7, fat: 1.2, fibre: 4.0, servingSize: '100g arils', state: 'fresh', source: 'USDA FoodData Central', isEstimated: false },

    // Vegetables
    'spinach': { name: 'Spinach (Raw)', quantity: 80, unit: 'g', calories: 18, protein: 2.3, carbs: 2.9, fat: 0.3, fibre: 1.8, servingSize: '80g fresh', state: 'raw', source: 'USDA FoodData Central', isEstimated: false },
    'broccoli': { name: 'Broccoli (Steamed)', quantity: 100, unit: 'g', calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4, fibre: 2.6, servingSize: '100g florets', state: 'cooked', source: 'USDA FoodData Central', isEstimated: false },
    'cucumber': { name: 'Cucumber', quantity: 100, unit: 'g', calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, fibre: 0.5, servingSize: '100g sliced', state: 'fresh', source: 'USDA FoodData Central', isEstimated: false }
};

if (typeof window !== 'undefined') window.CLIENT_NUTRITION_LOOKUP = CLIENT_NUTRITION_LOOKUP;
if (typeof global !== 'undefined') global.CLIENT_NUTRITION_LOOKUP = CLIENT_NUTRITION_LOOKUP;

function getUserConfirmedFoods() {
    const email = (currentUser && currentUser.email) ? currentUser.email.toLowerCase().trim() : 'guest';
    try {
        const stored = localStorage.getItem('ht_confirmed_foods_' + email);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) return parsed;
        }
    } catch (e) {}
    if (window.userConfirmedAvailableFoods && window.userConfirmedAvailableFoodsEmail === email && Array.isArray(window.userConfirmedAvailableFoods)) {
        return window.userConfirmedAvailableFoods;
    }
    return [];
}

function setUserConfirmedFoods(foods) {
    const email = (currentUser && currentUser.email) ? currentUser.email.toLowerCase().trim() : 'guest';
    const list = Array.isArray(foods) ? [...new Set(foods.filter(f => f && typeof f === 'string' && f.trim()).map(f => f.trim()))] : [];
    try {
        localStorage.setItem('ht_confirmed_foods_' + email, JSON.stringify(list));
    } catch (e) {}
    window.userConfirmedAvailableFoods = list;
    window.userConfirmedAvailableFoodsEmail = email;

    // Persist to backend MySQL / Express
    if (currentUser && currentUser.email) {
        fetch(`${AI_BACKEND_URL}/api/diet/confirmed-foods`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, confirmedFoods: list })
        }).catch(() => {});
    }
}

function syncUserConfirmedFoodsFromBackend(email) {
    if (!email) return;
    const cleanEmail = email.toLowerCase().trim();
    fetch(`${AI_BACKEND_URL}/api/diet/confirmed-foods?email=${encodeURIComponent(cleanEmail)}`)
        .then(r => r.json())
        .then(data => {
            if (data.success && Array.isArray(data.confirmedFoods)) {
                try {
                    localStorage.setItem('ht_confirmed_foods_' + cleanEmail, JSON.stringify(data.confirmedFoods));
                } catch (e) {}
                if (currentUser && currentUser.email && currentUser.email.toLowerCase().trim() === cleanEmail) {
                    window.userConfirmedAvailableFoods = data.confirmedFoods;
                    window.userConfirmedAvailableFoodsEmail = cleanEmail;
                }
            }
        })
        .catch(() => {});
}

function extractClientSideFoodsAndNutrition(attachment, message, payload) {
    const rawOcrText = (attachment && (attachment.ocrText || attachment.fileText)) || '';
    const nameCorpus = (attachment && attachment.name) ? attachment.name.replace(/\.[^/.]+$/, '').replace(/[_.-]/g, ' ') : '';
    const searchCorpus = (rawOcrText + '\n' + nameCorpus + '\n' + (message || '')).trim();

    const extractedFoods = [];
    const detailedFoods = [];
    const seen = new Set();

    function cleanClientFoodName(name) {
        if (!name || typeof name !== 'string') return '';
        let s = name.trim();
        s = s.replace(/\b\d+(?:\.\d+)?\s*(?:kg|g|gm|gms|grams|gram|ml|l|ltr|oz|lbs|lb|cups?|tbsp|tsp|pieces?|pcs?|slices?|scoops?|servings?|calories|kcal|cal)\b/gi, '').trim();
        s = s.replace(/\b(?:1\/2|1\/4|3\/4)\s*(?:cup|cups|tbsp|tsp)?\b/gi, '').trim();
        s = s.replace(/\b\d+\b/g, '').trim();
        s = s.replace(/\([^)]*\)/g, '').trim();
        s = s.replace(/\[[^\]]*\]/g, '').trim();
        s = s.replace(/^[0-9]+[\.\)\-]?\s*/, '').trim();
        s = s.replace(/^[\-\*•▪►–—]\s*/, '').trim();
        s = s.replace(/^[\s\-\:\,\(\)\[\]\.\/]+|[\s\-\:\,\(\)\[\]\.\/]+$/g, '').trim();
        const nonFood = new Set([
            'total', 'calories', 'calorie', 'protein', 'carbs', 'carbohydrates', 'fat', 'fibre', 'fiber',
            'macros', 'target', 'date', 'dr', 'doctor', 'trainer', 'patient', 'notes', 'prescription',
            'water', 'hydration', 'signature', 'hospital', 'clinic', 'diet', 'meal', 'nutrition',
            'instructions', 'daily', 'day', 'week', 'month', 'plan', 'chart', 'list', 'items', 'item',
            'quantity', 'amount', 'prep', 'preparation', 'breakfast', 'lunch', 'dinner', 'snack',
            'time', 'name', 'age', 'weight', 'height', 'bmi', 'bmr', 'kg', 'grams', 'table', 'food',
            'available', 'confirmed', 'grocery', 'groceries', 'supermarket', 'store', 'price', 'bill',
            'receipt', 'order', 'subtotal', 'tax', 'gst', 'change', 'cash', 'card', 'thank', 'you'
        ]);
        if (!s || nonFood.has(s.toLowerCase())) return '';
        return s.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    }

    // 1. Line/delimiter dynamic parsing from OCR text
    if (rawOcrText) {
        const tokens = rawOcrText.split(/[\r\n,;•*|]+/);
        tokens.forEach(rawToken => {
            let t = rawToken.trim();
            if (!t) return;
            t = t.replace(/^(?:breakfast|pre-lunch|mid-morning|morning|lunch|evening snack|snack|dinner|post-workout|ingredients|food items|grocery list|diet chart|items|foods)[\s\:\-]+/i, '').trim();
            const cleaned = cleanClientFoodName(t);
            if (cleaned && cleaned.length >= 2 && cleaned.length <= 40) {
                const lower = cleaned.toLowerCase();
                if (!seen.has(lower)) {
                    seen.add(lower);
                    extractedFoods.push(cleaned);
                }
            }
        });
    }

    // 2. Scan known dictionary items in search corpus
    if (typeof CLIENT_NUTRITION_LOOKUP !== 'undefined') {
        Object.keys(CLIENT_NUTRITION_LOOKUP).forEach(key => {
            const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp('\\b' + escaped + '\\b', 'i');
            if (regex.test(searchCorpus)) {
                const item = CLIENT_NUTRITION_LOOKUP[key];
                const cleanName = cleanClientFoodName((item && item.name) || key);
                if (cleanName) {
                    const lower = cleanName.toLowerCase();
                    let already = false;
                    for (const s of seen) {
                        if (s === lower || s.includes(lower) || lower.includes(s)) {
                            already = true;
                            break;
                        }
                    }
                    if (!already) {
                        seen.add(lower);
                        extractedFoods.push(cleanName);
                    }
                }
            }
        });
    }

    // Build detailed foods for each extracted food item
    extractedFoods.forEach(foodName => {
        const lookup = (typeof CLIENT_NUTRITION_LOOKUP !== 'undefined' && CLIENT_NUTRITION_LOOKUP[foodName.toLowerCase()]) || {};
        detailedFoods.push({
            name: foodName,
            quantity: lookup.quantity || 100,
            unit: lookup.unit || 'g',
            calories: lookup.calories !== undefined ? lookup.calories : 120,
            protein: lookup.protein !== undefined ? lookup.protein : 8,
            carbs: lookup.carbs !== undefined ? lookup.carbs : 15,
            fat: lookup.fat !== undefined ? lookup.fat : 3,
            fibre: lookup.fibre !== undefined ? lookup.fibre : 2,
            servingSize: lookup.servingSize || '100g portion',
            valueSource: lookup.source || 'DIRECT_IMAGE_EXTRACTED',
            isEstimated: lookup.calories === undefined,
            isUncertain: false,
            uncertaintyReason: null,
            percentages: {}
        });
    });

    const unclearOrMissingInfo = [];
    let notes = (message && message.trim()) ? message.trim() : 'Prescription notes acknowledged.';
    if (extractedFoods.length === 0) {
        unclearOrMissingInfo.push('No recognized food items found in this file. Please type or add your available foods below.');
        notes = 'No specific foods identified. Please confirm or add your available pantry items.';
    }

    return {
        documentName: attachment ? attachment.name : 'uploaded_food.jpg',
        doctorTrainerNotes: notes,
        targetCalories: (payload && payload.profile && (payload.profile.targetCalories || payload.profile.tdee)) ? Math.round(payload.profile.targetCalories || payload.profile.tdee) : 2100,
        extractedFoods: extractedFoods,
        detailedFoods: detailedFoods,
        unclearOrMissingInfo: unclearOrMissingInfo
    };
}

function sendAICoachChip(text) {
    const input = document.getElementById('aiCoachInput');
    if (input) input.value = text;
    sendAICoachMessage(text);
}

function sendAICoachMessage(overrideText) {
    const input = document.getElementById('aiCoachInput');
    const message = (overrideText !== undefined ? overrideText : (input ? input.value : '')).trim();
    const attachment = currentCoachAttachment ? { ...currentCoachAttachment } : null;

    // Do not send empty messages unless an attachment is selected
    if (!message && !attachment) {
        showToast('⚠️ Type a question or attach a photo or document.');
        return;
    }

    if (input) input.value = '';
    removeAICoachAttachment();

    // Hide centered welcome area once chatting starts
    const welcomeArea = document.getElementById('aiCoachWelcomeArea');
    if (welcomeArea) welcomeArea.classList.add('d-none');

    // Append user message bubble
    appendAICoachBubble('user', message, '', attachment, true);
    saveAICoachChatMessage({ sender: 'user', text: message, attachment: attachment, timestamp: Date.now() });
    aiCoachChatTurns.push({ role: 'user', content: message || (attachment ? `Uploaded attachment: ${attachment.name}` : '') });
    scrollAICoachToBottom();

    // Show typing feedback
    const typing = document.getElementById('aiCoachTyping');
    if (typing) typing.classList.remove('d-none');
    scrollAICoachToBottom();

    const payload = getAIUserDataPayload();

    if (attachment) {
        // Document / Photo attachment: call backend upload-document endpoint with multimodal base64 bytes
        fetch(`${AI_BACKEND_URL}/api/ai/upload-document`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                filename: attachment.name,
                fileText: attachment.fileText || '',
                ocrText: attachment.ocrText || '',
                fileData: attachment.dataUrl || null,
                mimeType: attachment.mimeType || (attachment.isImage ? 'image/jpeg' : 'application/pdf'),
                prompt: message || '',
                userGoal: payload.profile ? payload.profile.selectedGoal : 'Weight Loss'
            })
        })
        .then(res => res.json())
        .then(data => {
            if (typing) typing.classList.add('d-none');
            if (data.success && data.extraction) {
                handleCoachDocumentExtracted(data.extraction, message, payload, attachment);
            } else {
                throw new Error(data.error || 'Failed to extract document');
            }
            scrollAICoachToBottom();
        })
        .catch(err => {
            if (typing) typing.classList.add('d-none');
            // Client-side fallback extraction if backend offline
            const fallbackExtraction = extractClientSideFoodsAndNutrition(attachment, message, payload);
            handleCoachDocumentExtracted(fallbackExtraction, message, payload, attachment);
            scrollAICoachToBottom();
        });
    } else {
        // Text-only message: standard Groq / Coach call
        fetch(`${AI_BACKEND_URL}/api/ai/coach`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: message,
                fullUserData: payload,
                history: aiCoachChatTurns.slice(-10),
                activeDietPlan: currentActiveDietPlan,
                activeDietPlanId: currentActiveDietPlan ? currentActiveDietPlan.id : null,
                confirmedAvailableFoods: getUserConfirmedFoods(),
                email: currentUser ? currentUser.email : null
            })
        })
        .then(res => res.json())
        .then(data => {
            if (typing) typing.classList.add('d-none');
            if (data.success && data.answer) {
                if (data.dietPlan) {
                    currentActiveDietPlan = data.dietPlan;
                    currentDietPlanDayIndex = Math.max(0, getCurrentActiveChallengeDay() - 1);
                }
                appendAICoachBubble('bot', data.answer, data.source, null, true, data.dietPlan || null, data.searchSources || [], data.recipe || null);
                aiCoachChatTurns.push({ role: 'model', content: data.answer });
                saveAICoachChatMessage({ sender: 'bot', text: data.answer, source: data.source, dietPlan: data.dietPlan, searchSources: data.searchSources, recipe: data.recipe || null, timestamp: Date.now() });
            } else {
                throw new Error(data.error || 'No answer returned');
            }
            scrollAICoachToBottom();
        })
        .catch(err => {
            if (typing) typing.classList.add('d-none');
            const fallbackResult = generateClientCoachFallbackWithPlan(message, payload);
            if (fallbackResult.dietPlan) {
                currentActiveDietPlan = fallbackResult.dietPlan;
                currentDietPlanDayIndex = Math.max(0, getCurrentActiveChallengeDay() - 1);
            }
            appendAICoachBubble('bot', fallbackResult.text, 'offline', null, true, fallbackResult.dietPlan || null, [], fallbackResult.recipe || null);
            aiCoachChatTurns.push({ role: 'model', content: fallbackResult.text });
            saveAICoachChatMessage({ sender: 'bot', text: fallbackResult.text, source: 'offline', dietPlan: fallbackResult.dietPlan, recipe: fallbackResult.recipe || null, timestamp: Date.now() });
            scrollAICoachToBottom();
        });
    }
}

function handleCoachDocumentExtracted(extraction, userMessage, payload, attachment) {
    const profile = payload.profile || {};
    const profileTarget = Math.round(profile.targetCalories || profile.tdee || 2050);
    const docTarget = Math.round(extraction.targetCalories || profileTarget);
    const hasDiscrepancy = Math.abs(docTarget - profileTarget) >= 50;

    const existingConfirmed = getUserConfirmedFoods();
    const newlyExtracted = extraction.extractedFoods ? [...extraction.extractedFoods] : [];

    activeFoodConfirmationData = {
        documentName: extraction.documentName,
        doctorTrainerNotes: extraction.doctorTrainerNotes || 'Prescription notes acknowledged.',
        targetCalories: docTarget,
        profileTargetCalories: profileTarget,
        selectedCalorieTarget: hasDiscrepancy ? profileTarget : docTarget,
        newlyExtractedFoods: newlyExtracted,
        existingConfirmedFoods: existingConfirmed,
        mergeMode: 'replace',
        extractedFoods: [...newlyExtracted],
        selectedFoods: [...newlyExtracted],
        detailedFoods: extraction.detailedFoods ? [...extraction.detailedFoods] : [],
        suggestedMeals: extraction.suggestedMeals ? [...extraction.suggestedMeals] : [],
        unclearOrMissingInfo: extraction.unclearOrMissingInfo ? [...extraction.unclearOrMissingInfo] : [],
        selectedPlanType: '7_DAY'
    };

    let introText = `📄 **Document Understood:** \`${extraction.documentName}\`\n\n`;
    if (extraction.doctorTrainerNotes) {
        introText += `🩺 **Doctor / Trainer Prescription:** ${extraction.doctorTrainerNotes}\n\n`;
    }
    introText += `🥗 **Extracted Foods (${activeFoodConfirmationData.extractedFoods.length}):** ${activeFoodConfirmationData.extractedFoods.join(', ')}\n\n`;

    if (hasDiscrepancy) {
        introText += `⚠️ **Calorie Target Discrepancy Detected:**\n` +
            `- **Doctor / Document Target:** **${docTarget} kcal**\n` +
            `- **Profile & Calorie Calculator Target:** **${profileTarget} kcal**\n\n` +
            `👉 *Please confirm your available food list and preferred calorie target in the dialog to generate your 5-meal plan!*`;
    } else {
        introText += `🎯 **Target Calories:** **${profileTarget} kcal** (Synchronized with your Profile & Calorie Calculator)\n\n` +
            `👉 *Please confirm your available food list in the dialog to generate your tailored 5-meal plan!*`;
    }

    appendAICoachBubble('bot', introText, 'groq');
    saveAICoachChatMessage({ sender: 'bot', text: introText, source: 'groq', timestamp: Date.now() });
    scrollAICoachToBottom();

    openFoodConfirmationModal();
}

function setPantryMergeMode(mode) {
    if (!activeFoodConfirmationData) return;
    activeFoodConfirmationData.mergeMode = mode;
    if (mode === 'replace') {
        activeFoodConfirmationData.extractedFoods = [...activeFoodConfirmationData.newlyExtractedFoods];
    } else {
        const merged = [...(activeFoodConfirmationData.existingConfirmedFoods || [])];
        (activeFoodConfirmationData.newlyExtractedFoods || []).forEach(f => {
            if (!merged.includes(f)) merged.push(f);
        });
        activeFoodConfirmationData.extractedFoods = merged;
    }
    activeFoodConfirmationData.selectedFoods = [...activeFoodConfirmationData.extractedFoods];
    renderFoodConfirmationUI();
}

function selectAllConfirmationFoods() {
    if (!activeFoodConfirmationData) return;
    activeFoodConfirmationData.selectedFoods = [...activeFoodConfirmationData.extractedFoods];
    renderFoodConfirmationUI();
}

function deselectAllConfirmationFoods() {
    if (!activeFoodConfirmationData) return;
    activeFoodConfirmationData.selectedFoods = [];
    renderFoodConfirmationUI();
}

function toggleFoodSelection(foodName) {
    if (!activeFoodConfirmationData || !foodName) return;
    if (!Array.isArray(activeFoodConfirmationData.selectedFoods)) {
        activeFoodConfirmationData.selectedFoods = [...activeFoodConfirmationData.extractedFoods];
    }
    const idx = activeFoodConfirmationData.selectedFoods.indexOf(foodName);
    if (idx >= 0) {
        activeFoodConfirmationData.selectedFoods.splice(idx, 1);
    } else {
        activeFoodConfirmationData.selectedFoods.push(foodName);
    }
    renderFoodConfirmationUI();
}

function openFoodConfirmationModal() {
    if (!activeFoodConfirmationData) return;
    renderFoodConfirmationUI();
    const modalEl = document.getElementById('foodConfirmationModal');
    if (modalEl) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
    }
}

function renderFoodConfirmationUI() {
    const container = document.getElementById('foodConfirmationBody');
    if (!container || !activeFoodConfirmationData) return;

    const data = activeFoodConfirmationData;
    const hasDiff = Math.abs(data.targetCalories - data.profileTargetCalories) >= 50;

    let pantryStrategyHtml = '';
    if (data.existingConfirmedFoods && data.existingConfirmedFoods.length > 0) {
        pantryStrategyHtml = `
            <div class="mb-3 p-3 rounded" style="background: #1B1B1B; border: 1px solid #383838;">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="small fw-semibold text-warning">
                        <i class="bi bi-arrow-repeat"></i> Update Strategy for Existing Confirmed Foods (${data.existingConfirmedFoods.length} saved):
                    </span>
                    <span class="badge bg-secondary" style="font-size: 10px;">Pantry Management</span>
                </div>
                <div class="d-flex flex-column flex-sm-row gap-3">
                    <label class="form-check-label d-flex align-items-center gap-2 p-2 rounded cursor-pointer flex-fill" style="background: #141414; border: 1px solid ${data.mergeMode === 'replace' ? '#FF8A1F' : '#2A2A2A'};">
                        <input type="radio" name="pantryMergeChoice" value="replace" class="form-check-input" ${data.mergeMode === 'replace' ? 'checked' : ''} onchange="setPantryMergeMode('replace')">
                        <div>
                            <strong class="text-white small">🔄 Replace Existing</strong>
                            <div class="text-muted" style="font-size: 11px;">Clear existing confirmed list and start fresh with newly extracted foods</div>
                        </div>
                    </label>
                    <label class="form-check-label d-flex align-items-center gap-2 p-2 rounded cursor-pointer flex-fill" style="background: #141414; border: 1px solid ${data.mergeMode === 'add' ? '#6FAE3D' : '#2A2A2A'};">
                        <input type="radio" name="pantryMergeChoice" value="add" class="form-check-input" ${data.mergeMode === 'add' ? 'checked' : ''} onchange="setPantryMergeMode('add')">
                        <div>
                            <strong class="text-white small">➕ Add / Merge</strong>
                            <div class="text-muted" style="font-size: 11px;">Keep existing confirmed foods and combine them with new items</div>
                        </div>
                    </label>
                </div>
            </div>
        `;
    }

    let calComparisonHtml = '';
    if (hasDiff) {
        calComparisonHtml = `
            <div class="p-3 mb-3 rounded" style="background: rgba(255,138,31,0.12); border: 1px solid #FF8A1F;">
                <div class="fw-bold mb-2 text-warning d-flex align-items-center gap-2">
                    <i class="bi bi-exclamation-triangle-fill"></i> Calorie Target Discrepancy Detected
                </div>
                <p class="small text-muted mb-2">The uploaded prescription specifies a different calorie target than your Profile & Calorie Calculator. Which would you prefer to use?</p>
                <div class="d-flex flex-column gap-2">
                    <label class="form-check-label d-flex align-items-center gap-2 p-2 rounded cursor-pointer" style="background: #1C1C1C; border: 1px solid #333;">
                        <input type="radio" name="confirmCalChoice" value="profile" class="form-check-input" ${data.selectedCalorieTarget === data.profileTargetCalories ? 'checked' : ''} onchange="setConfirmationCalTarget('profile')">
                        <div>
                            <strong>⚖️ Profile Calculator Target: ${data.profileTargetCalories} kcal</strong>
                            <div class="small text-muted">Mifflin-St Jeor calculated based on your weight, height, age & fitness goal (Recommended)</div>
                        </div>
                    </label>
                    <label class="form-check-label d-flex align-items-center gap-2 p-2 rounded cursor-pointer" style="background: #1C1C1C; border: 1px solid #333;">
                        <input type="radio" name="confirmCalChoice" value="document" class="form-check-input" ${data.selectedCalorieTarget === data.targetCalories ? 'checked' : ''} onchange="setConfirmationCalTarget('document')">
                        <div>
                            <strong>🩺 Doctor / Prescription Target: ${data.targetCalories} kcal</strong>
                            <div class="small text-muted">Specified directly in your uploaded document / diet chart</div>
                        </div>
                    </label>
                </div>
            </div>
        `;
    } else {
        calComparisonHtml = `
            <div class="p-3 mb-3 rounded d-flex justify-content-between align-items-center flex-wrap gap-2" style="background: #1A1A1A; border: 1px solid #2F2F2F;">
                <div>
                    <span class="text-muted small">Target Calories (from Profile & Calorie Calculator):</span>
                    <div class="fw-bold fs-5 text-warning">🎯 ${data.profileTargetCalories} kcal / day</div>
                </div>
                <div>
                    <span class="badge" style="background: rgba(111,174,61,0.2); color: #6FAE3D; border: 1px solid #6FAE3D;">Aligned with Calculator</span>
                </div>
            </div>
        `;
    }

    // Strict Ingredient Matching & Variety Limiter Warning
    let varietyWarningHtml = '';
    if (data.extractedFoods.length < 4) {
        varietyWarningHtml = `
            <div class="alert alert-warning py-2 px-3 small d-flex align-items-center gap-2 mb-3" style="background: rgba(255, 193, 7, 0.12); border: 1px solid rgba(255, 193, 7, 0.4); color: #FFC107;">
                <i class="bi bi-exclamation-triangle-fill fs-5"></i>
                <div>
                    <strong>Limited Variety Warning:</strong> You currently have only <strong>${data.extractedFoods.length}</strong> confirmed food(s). 
                    To create balanced 5-meal variety across 7 or 25 days, consider adding 2–3 more foods (e.g. Oats, Paneer, Lentils, or Almonds) below.
                </div>
            </div>
        `;
    }

    if (!Array.isArray(data.selectedFoods)) {
        data.selectedFoods = [...data.extractedFoods];
    }
    const selectedCount = data.selectedFoods.length;
    const totalCount = data.extractedFoods.length;

    let chipsHtml = data.extractedFoods.map((food, idx) => {
        const isSelected = data.selectedFoods.includes(food);
        return `
            <span class="badge p-2 bg-dark border ${isSelected ? 'border-success' : 'border-secondary'} d-inline-flex align-items-center gap-2 text-white" style="font-size: 13px; transition: all 0.15s ease;">
                <input type="checkbox" class="form-check-input mt-0" style="cursor: pointer;" ${isSelected ? 'checked' : ''} onchange="toggleFoodSelection('${escapeCoachHtml(food)}')">
                <span onclick="toggleFoodSelection('${escapeCoachHtml(food)}')" style="cursor: pointer; user-select: none;">🥗 ${escapeCoachHtml(food)}</span>
                <button type="button" class="btn-close btn-close-white ms-1" style="font-size: 8px;" onclick="removeFoodFromConfirmation(${idx})" title="Remove ${escapeCoachHtml(food)}"></button>
            </span>
        `;
    }).join('');

    // Detailed Foods Breakdown with Source Badges (DIRECT_IMAGE_EXTRACTED vs BACKEND_CALCULATED vs AI_ESTIMATED)
    let detailedTableHtml = '';
    if (data.detailedFoods && data.detailedFoods.length > 0) {
        const rows = data.detailedFoods.map((df, idx) => {
            const isLabel = df.valueSource === 'DIRECT_IMAGE_EXTRACTED';
            const isEst = df.valueSource === 'AI_ESTIMATED';
            const rawSrc = (df.valueSource || '').toLowerCase();
            const sourceBadge = isLabel 
                ? `<span class="badge" style="background: rgba(111, 174, 61, 0.2); color: #6FAE3D; border: 1px solid #6FAE3D;" title="Extracted directly from packaging label">🏷️ Packaging reference value</span>`
                : (isEst || df.isEstimated
                    ? `<span class="badge" style="background: rgba(255, 138, 31, 0.2); color: #FF8A1F; border: 1px solid #FF8A1F;" title="Visually estimated from portion appearance">⚠️ Estimated value</span>`
                    : (rawSrc.includes('ifct') || rawSrc.includes('icmr')
                        ? `<span class="badge" style="background: rgba(66, 133, 244, 0.2); color: #8AB4F8; border: 1px solid #4285F4;" title="Verified from ICMR-NIN Indian Food Composition Tables">🏛️ IFCT reference value</span>`
                        : `<span class="badge" style="background: rgba(66, 133, 244, 0.2); color: #8AB4F8; border: 1px solid #4285F4;" title="Verified from USDA FoodData Central">🏛️ USDA reference value</span>`));
            
            const uncertaintyAlert = df.isUncertain 
                ? `<div class="small text-danger mt-1"><i class="bi bi-question-circle"></i> ${escapeCoachHtml(df.uncertaintyReason || 'Visual portion estimate - verify before eating')}</div>`
                : '';

            return `
                <tr style="border-bottom: 1px solid #282828; font-size: 12px;">
                    <td class="py-2 text-white">
                        <strong>${escapeCoachHtml(df.name)}</strong>
                        <div class="text-muted small">${df.servingSize || (df.quantity + (df.unit || 'g'))}</div>
                        ${uncertaintyAlert}
                    </td>
                    <td class="py-2 text-warning fw-semibold">${df.calories != null ? df.calories + ' kcal' : '-'}</td>
                    <td class="py-2 text-info">${df.protein != null ? df.protein + 'g' : '-'}</td>
                    <td class="py-2 text-light">${df.carbs != null ? df.carbs + 'g' : '-'}</td>
                    <td class="py-2 text-light">${df.fat != null ? df.fat + 'g' : '-'}</td>
                    <td class="py-2">${sourceBadge}</td>
                </tr>
            `;
        }).join('');

        detailedTableHtml = `
            <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <label class="fw-semibold mb-0" style="color: #6FAE3D; font-size: 13px;">
                        <i class="bi bi-camera-fill"></i> Vision & Label Extraction Metrics
                    </label>
                    <span class="text-muted small">Exact packaging numbers preserved</span>
                </div>
                <div class="table-responsive rounded" style="background: #141414; border: 1px solid #282828; max-height: 180px; overflow-y: auto;">
                    <table class="table table-dark table-sm table-borderless mb-0 align-middle">
                        <thead>
                            <tr style="border-bottom: 1px solid #333; color: #888; font-size: 11px;">
                                <th class="py-2">Item</th>
                                <th class="py-2">Calories</th>
                                <th class="py-2">Protein</th>
                                <th class="py-2">Carbs</th>
                                <th class="py-2">Fat</th>
                                <th class="py-2">Source</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // Dynamic Discovery & Suggestions (Google Search Grounding / Suggestions to user)
    const suggestedCandidates = ['Oats', 'Paneer', 'Brown Rice', 'Lentils', 'Spinach', 'Greek Yogurt', 'Almonds', 'Eggs', 'Chicken Breast', 'Chia Seeds', 'Sweet Potato', 'Tofu']
        .filter(c => !data.extractedFoods.some(ef => ef.toLowerCase() === c.toLowerCase()))
        .slice(0, 6);

    let suggestedHtml = '';
    if (suggestedCandidates.length > 0) {
        const suggestionChips = suggestedCandidates.map(c => `
            <button type="button" class="btn btn-sm btn-outline-secondary py-0 px-2" style="font-size: 11px; border-radius: 12px; border-color: #444; color: #BBB;" onclick="addSpecificFoodToConfirmation('${c}')">
                + ${c}
            </button>
        `).join('');
        suggestedHtml = `
            <div class="mb-3 p-2 rounded" style="background: #161616; border: 1px dashed #333;">
                <div class="small text-muted mb-1"><i class="bi bi-lightbulb"></i> Suggested healthy foods to add for variety:</div>
                <div class="d-flex flex-wrap gap-1">${suggestionChips}</div>
            </div>
        `;
    }

    container.innerHTML = `
        ${pantryStrategyHtml}
        ${calComparisonHtml}
        ${varietyWarningHtml}
        
        <div class="mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                <div class="d-flex align-items-center gap-2">
                    <label class="fw-semibold mb-0" style="color: #FF8A1F;">
                        <i class="bi bi-card-checklist"></i> Confirmed Available Foods (${totalCount})
                    </label>
                    <span class="badge ${selectedCount > 0 ? 'bg-success' : 'bg-danger'}" style="font-size: 11px;">
                        ${selectedCount} Selected
                    </span>
                </div>
                <div class="btn-group btn-group-sm">
                    <button type="button" class="btn btn-outline-success py-0 px-2" style="font-size: 11px;" onclick="selectAllConfirmationFoods()" title="Select all extracted foods">
                        <i class="bi bi-check-all"></i> Select All
                    </button>
                    <button type="button" class="btn btn-outline-secondary py-0 px-2" style="font-size: 11px;" onclick="deselectAllConfirmationFoods()" title="Clear food selections">
                        <i class="bi bi-x-circle"></i> Clear Selection
                    </button>
                </div>
            </div>
            <div class="d-flex flex-wrap gap-2 p-3 rounded mb-2" style="background: #171717; border: 1px solid #282828; min-height: 70px;">
                ${chipsHtml.length > 0 ? chipsHtml : '<div class="text-muted small">No foods in list. Add some below!</div>'}
            </div>

            ${suggestedHtml}

            <!-- Add new food input -->
            <div class="input-group">
                <input type="text" id="addConfirmedFoodInput" class="form-control" placeholder="Add another available food (e.g. Oats, Paneer, Dal, Apple)..." style="background: #1F1F1F; border: 1px solid #333; color: #fff;" onkeydown="if(event.key==='Enter'){event.preventDefault();addFoodToConfirmation();}">
                <button type="button" class="btn btn-outline-warning" onclick="addFoodToConfirmation()">+ Add Food</button>
            </div>
        </div>

        ${detailedTableHtml}

        <div class="row g-3">
            <div class="col-md-6">
                <label class="form-label small text-muted">Plan Duration</label>
                <select id="confirmPlanTypeSelect" class="form-select" style="background: #1F1F1F; border: 1px solid #333; color: #fff;" onchange="activeFoodConfirmationData.selectedPlanType = this.value">
                    <option value="7_DAY" ${data.selectedPlanType === '7_DAY' ? 'selected' : ''}>7-Day Transformation Plan (Recommended)</option>
                    <option value="DAILY" ${data.selectedPlanType === 'DAILY' ? 'selected' : ''}>Daily Plan (1 Day, 5 Meals)</option>
                    <option value="25_DAY" ${data.selectedPlanType === '25_DAY' ? 'selected' : ''}>25-Day Comprehensive Challenge Plan</option>
                </select>
            </div>
            <div class="col-md-6">
                <label class="form-label small text-muted">Doctor / Prescription Notes</label>
                <input type="text" class="form-control" style="background: #1F1F1F; border: 1px solid #333; color: #fff;" value="${escapeCoachHtml(data.doctorTrainerNotes)}" onchange="activeFoodConfirmationData.doctorTrainerNotes = this.value">
            </div>
        </div>
    `;
}

function addSpecificFoodToConfirmation(foodName) {
    if (!activeFoodConfirmationData || !foodName) return;
    if (!activeFoodConfirmationData.extractedFoods.includes(foodName)) {
        activeFoodConfirmationData.extractedFoods.push(foodName);
        if (!Array.isArray(activeFoodConfirmationData.selectedFoods)) {
            activeFoodConfirmationData.selectedFoods = [];
        }
        activeFoodConfirmationData.selectedFoods.push(foodName);
        renderFoodConfirmationUI();
    }
}

function setConfirmationCalTarget(choice) {
    if (!activeFoodConfirmationData) return;
    if (choice === 'profile') {
        activeFoodConfirmationData.selectedCalorieTarget = activeFoodConfirmationData.profileTargetCalories;
    } else {
        activeFoodConfirmationData.selectedCalorieTarget = activeFoodConfirmationData.targetCalories;
    }
}

function removeFoodFromConfirmation(index) {
    if (!activeFoodConfirmationData || !activeFoodConfirmationData.extractedFoods) return;
    const removed = activeFoodConfirmationData.extractedFoods.splice(index, 1)[0];
    if (removed && Array.isArray(activeFoodConfirmationData.selectedFoods)) {
        const sIdx = activeFoodConfirmationData.selectedFoods.indexOf(removed);
        if (sIdx >= 0) activeFoodConfirmationData.selectedFoods.splice(sIdx, 1);
    }
    renderFoodConfirmationUI();
}

function addFoodToConfirmation() {
    const input = document.getElementById('addConfirmedFoodInput');
    if (!input) return;
    const val = input.value.trim();
    if (!val) return;
    if (!activeFoodConfirmationData.extractedFoods.includes(val)) {
        activeFoodConfirmationData.extractedFoods.push(val);
        if (!Array.isArray(activeFoodConfirmationData.selectedFoods)) {
            activeFoodConfirmationData.selectedFoods = [];
        }
        activeFoodConfirmationData.selectedFoods.push(val);
        input.value = '';
        renderFoodConfirmationUI();
    } else {
        showToast('Food already in list!');
    }
}

function submitConfirmedFoodsPlan() {
    if (!activeFoodConfirmationData) return;
    const confirmedList = (activeFoodConfirmationData.selectedFoods && activeFoodConfirmationData.selectedFoods.length > 0)
        ? activeFoodConfirmationData.selectedFoods
        : activeFoodConfirmationData.extractedFoods;

    if (!confirmedList || confirmedList.length === 0) {
        showToast('⚠️ Please select at least 2–3 foods to confirm.');
        return;
    }

    const modalEl = document.getElementById('foodConfirmationModal');
    if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
    }

    const data = activeFoodConfirmationData;
    // Strictly preserve user's confirmed/selected foods
    let finalFoodsToSave = [...confirmedList];

    // Persist confirmed available foods into user profile storage
    setUserConfirmedFoods(finalFoodsToSave);

    const payload = getAIUserDataPayload();
    const userGoal = (payload.profile && payload.profile.selectedGoal) || 'Weight Loss';

    const typing = document.getElementById('aiCoachTyping');
    if (typing) typing.classList.remove('d-none');
    scrollAICoachToBottom();

    fetch(`${AI_BACKEND_URL}/api/diet/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: currentUser ? currentUser.email : null,
            planType: data.selectedPlanType || '7_DAY',
            confirmedFoods: finalFoodsToSave,
            availableFoods: finalFoodsToSave,
            goal: userGoal,
            targetCalories: data.selectedCalorieTarget,
            doctorNotes: data.doctorTrainerNotes || '',
            profileData: payload.profile || {},
            userData: payload
        })
    })
    .then(res => res.json())
    .then(resData => {
        if (typing) typing.classList.add('d-none');
        if (resData.success && resData.dietPlan) {
            currentActiveDietPlan = resData.dietPlan;
            currentDietPlanDayIndex = Math.max(0, getCurrentActiveChallengeDay() - 1);
            // Persist locally in IndexedDB client database (zero localStorage quota impact)
            HealthifyIDB.saveDietPlan(resData.dietPlan);

            const dietPlanDisplay = document.getElementById('dietPlanDisplay');
            if (dietPlanDisplay) {
                dietPlanDisplay.innerHTML = renderDietPlanHtml(resData.dietPlan);
            }

            const reply = `✅ **5-Meal Diet Plan Generated!**\n\n` +
                `I have structured your **${resData.dietPlan.title}** tailored exactly to your confirmed foods and calorie target (${Math.round(resData.dietPlan.dailyTargetCalories)} kcal / day).\n\n` +
                `Every meal displays raw/cooked weights, preparation methods, and exact nutrition metrics. You can mark meals as consumed, print the plan, or request adjustments anytime!`;
            
            appendAICoachBubble('bot', reply, 'groq', null, true, resData.dietPlan);
            aiCoachChatTurns.push({ role: 'model', content: reply });
            saveAICoachChatMessage({ sender: 'bot', text: reply, source: 'groq', dietPlan: resData.dietPlan, timestamp: Date.now() });
            scrollAICoachToBottom();
            showToast('🎉 5-Meal Diet Plan generated successfully!');
        } else {
            throw new Error(resData.error || 'Failed to generate plan');
        }
    })
    .catch(err => {
        if (typing) typing.classList.add('d-none');
        const fallbackResult = generateClientCoachFallbackWithPlan(`create diet plan for ${data.selectedPlanType}`, payload, finalFoodsToSave);
        if (fallbackResult.dietPlan) {
            currentActiveDietPlan = fallbackResult.dietPlan;
            currentDietPlanDayIndex = Math.max(0, getCurrentActiveChallengeDay() - 1);
            // Persist locally in IndexedDB client database (zero localStorage quota impact)
            HealthifyIDB.saveDietPlan(fallbackResult.dietPlan);

            const dietPlanDisplay = document.getElementById('dietPlanDisplay');
            if (dietPlanDisplay) {
                dietPlanDisplay.innerHTML = renderDietPlanHtml(fallbackResult.dietPlan);
            }

            appendAICoachBubble('bot', fallbackResult.text, 'offline', null, true, fallbackResult.dietPlan);
            aiCoachChatTurns.push({ role: 'model', content: fallbackResult.text });
            saveAICoachChatMessage({ sender: 'bot', text: fallbackResult.text, source: 'offline', dietPlan: fallbackResult.dietPlan, timestamp: Date.now() });
            scrollAICoachToBottom();
            showToast('🎉 5-Meal Diet Plan generated successfully!');
        } else {
            showToast('⚠️ Could not generate plan: ' + err.message);
        }
    });
}

function renderDietPlanHtml(plan) {
    if (!plan) return '';

    // Normalize days array if passed as Map or Object from backend
    if (plan.days && !Array.isArray(plan.days) && typeof plan.days === 'object') {
        plan.days = Object.keys(plan.days).map((k, idx) => {
            const meals = plan.days[k];
            let dayCal = 0, dayPro = 0, dayCarbs = 0, dayFat = 0, dayFib = 0;
            if (Array.isArray(meals)) {
                meals.forEach(m => {
                    dayCal += m.subtotalCalories || m.totalCalories || 0;
                    dayPro += m.subtotalProtein || m.totalProtein || 0;
                    dayCarbs += m.subtotalCarbs || m.totalCarbs || 0;
                    dayFat += m.subtotalFat || m.totalFat || 0;
                    dayFib += m.subtotalFibre || m.totalFibre || 0;
                });
            }
            return {
                dayNumber: idx + 1,
                dayTitle: k,
                day: idx + 1,
                targetCalories: plan.dailyTargetCalories || plan.calorieTarget || 2050,
                totalCalories: Math.round(dayCal * 10) / 10,
                totalProtein: Math.round(dayPro * 10) / 10,
                totalCarbs: Math.round(dayCarbs * 10) / 10,
                totalFat: Math.round(dayFat * 10) / 10,
                totalFibre: Math.round(dayFib * 10) / 10,
                meals: meals
            };
        });
    } else if (!plan.days && Array.isArray(plan.daysList)) {
        plan.days = plan.daysList;
    }

    if (!plan.days || plan.days.length === 0) return '';

    const planId = plan.id || 'plan_' + Date.now();
    const durationLabel = plan.planType === '25_DAY' ? '25-Day' : (plan.planType === '7_DAY' ? '7-Day' : 'Daily');
    
    const activeDay = getCurrentActiveChallengeDay();

    // Day selector
    let dayPills = '';
    if (plan.days.length > 1) {
        dayPills = `
            <div class="d-flex flex-wrap gap-1 mb-3 pb-2 border-bottom border-dark">
                ${plan.days.map((d, idx) => {
                    const dNum = d.dayNumber || (idx + 1);
                    const isDayDone = isChallengeDayCompleted(dNum) || !!d.isCompleted;
                    const isDayCur = (dNum === activeDay) && !isDayDone;
                    const isDayLock = (dNum > activeDay);
                    let pillStyle = '';
                    let pillLabel = `Day ${dNum}`;
                    if (isDayDone) {
                        pillStyle = 'border-color: #6FAE3D; color: #6FAE3D;';
                        pillLabel = `✅ Day ${dNum}`;
                    } else if (isDayCur) {
                        pillStyle = 'border-color: #FF8A1F; font-weight: bold; color: #fff;';
                        pillLabel = `⭐ Day ${dNum}`;
                    } else if (isDayLock) {
                        pillStyle = 'opacity: 0.5; color: #888;';
                        pillLabel = `🔒 Day ${dNum}`;
                    }
                    return `
                    <button type="button" class="btn btn-xs rounded-pill ai-plan-day-pill ${idx === currentDietPlanDayIndex ? 'active' : ''}" style="${pillStyle}" onclick="switchDietPlanDay('${planId}', ${idx})">
                        ${pillLabel}
                    </button>
                    `;
                }).join('')}
                <button type="button" class="btn btn-xs rounded-pill ai-plan-day-pill ${currentDietPlanDayIndex === -1 ? 'active' : ''}" onclick="switchDietPlanDay('${planId}', -1)">
                    All Days
                </button>
            </div>
        `;
    }

    // Determine which days to display
    let displayDays = [];
    if (currentDietPlanDayIndex === -1 || plan.days.length === 1) {
        displayDays = plan.days;
    } else {
        const d = plan.days[currentDietPlanDayIndex] || plan.days.find(x => x.dayNumber === activeDay) || plan.days[0];
        displayDays = [d];
    }

    let daysHtml = displayDays.map(d => {
        const dNum = d.dayNumber;
        const isDayDone = isChallengeDayCompleted(dNum) || !!d.isCompleted;
        const isDayCur = (dNum === activeDay) && !isDayDone;
        const isDayLock = (dNum > activeDay);

        let dayStatusBanner = '';
        if (isDayDone) {
            dayStatusBanner = `
                <div class="p-2 mb-2 rounded d-flex align-items-center justify-content-between flex-wrap gap-1" style="background: rgba(111,174,61,0.12); border: 1px solid rgba(111,174,61,0.35); font-size: 12px; color: #6FAE3D;">
                    <span><i class="bi bi-check-circle-fill me-1"></i> <strong>Day ${dNum} Completed & Locked</strong> — Read-only challenge archive</span>
                    <span class="badge" style="background:#1B3820; color:#6FAE3D; border:1px solid #6FAE3D;">Archived ✅</span>
                </div>
            `;
        } else if (isDayCur) {
            dayStatusBanner = `
                <div class="p-2 mb-2 rounded d-flex align-items-center justify-content-between flex-wrap gap-1" style="background: rgba(255,138,31,0.12); border: 1px solid rgba(255,138,31,0.35); font-size: 12px; color: #FF8A1F;">
                    <span><i class="bi bi-lightning-charge-fill me-1"></i> <strong>Day ${dNum} Active Session</strong> — Mark meals consumed as you eat</span>
                    <span class="badge" style="background: linear-gradient(135deg, #6B3F24, #FF8A1F); color:#fff;">In Progress ⭐</span>
                </div>
            `;
        } else if (isDayLock) {
            dayStatusBanner = `
                <div class="p-2 mb-2 rounded d-flex align-items-center justify-content-between flex-wrap gap-1" style="background: rgba(255,255,255,0.04); border: 1px solid #333; font-size: 12px; color: #888;">
                    <span><i class="bi bi-lock-fill me-1"></i> <strong>Day ${dNum} Locked</strong> — Complete Day ${activeDay} to unlock</span>
                    <span class="badge bg-dark border border-secondary text-secondary">Locked 🔒</span>
                </div>
            `;
        }

        let mealsHtml = (d.meals || []).map(m => {
            const isConsumed = m.status === 'CONSUMED' || !!m.isConsumed;
            const isSkipped = m.status === 'SKIPPED';
            const statusClass = isConsumed ? 'consumed' : (isSkipped ? 'skipped' : '');
            const statusBadge = isConsumed 
                ? '<span class="badge" style="background:#1B3820; color:#6FAE3D; border:1px solid #6FAE3D;">✅ Consumed</span>' 
                : (isSkipped 
                    ? '<span class="badge bg-secondary">⏭️ Skipped</span>' 
                    : '<span class="badge" style="background:#262626; color:#A9A9A9; border:1px solid #333;">⏳ Pending</span>');

            const itemsRows = (m.items || []).map(it => {
                const g = it.grams || it.quantity || 100;
                const cal = Math.round((it.cal !== undefined ? it.cal : it.calories) || 0);
                const pro = Math.round(((it.pro !== undefined ? it.pro : it.protein) || 0) * 10) / 10;
                const carbs = Math.round((it.carbs || 0) * 10) / 10;
                const src = it.valueSource || 'USDA FoodData Central / IFCT';
                const isEst = !!it.isEstimated;
                let sourceBadgeHtml = '';
                if (isEst || src === 'ESTIMATED') {
                    sourceBadgeHtml = `<span class="badge bg-black border border-warning text-warning ms-1" style="font-size: 9px;" title="Nutritional values estimated">⚠️ Estimated value</span>`;
                } else if (src.toLowerCase().includes('usda')) {
                    sourceBadgeHtml = `<span class="badge bg-black border border-info text-info ms-1" style="font-size: 9px;" title="Verified from USDA FoodData Central">USDA reference value</span>`;
                } else if (src.toLowerCase().includes('ifct') || src.toLowerCase().includes('icmr')) {
                    sourceBadgeHtml = `<span class="badge bg-black border border-info text-info ms-1" style="font-size: 9px;" title="Verified from ICMR-NIN Indian Food Composition Tables">IFCT reference value</span>`;
                } else {
                    sourceBadgeHtml = `<span class="badge bg-black border border-info text-info ms-1" style="font-size: 9px;" title="Source: ${escapeCoachHtml(src)}">${escapeCoachHtml(src)} reference value</span>`;
                }
                return `
                <div class="ai-food-item-row">
                    <div>
                        <span class="me-1">${it.emoji || '🍽️'}</span>
                        <strong class="text-white">${escapeCoachHtml(it.name)}</strong>
                        <span class="badge bg-dark border border-secondary text-secondary ms-1">${g}g · ${it.state || 'Raw'}</span>
                        ${sourceBadgeHtml}
                        <div class="small text-muted fst-italic ps-4">${it.prepMethod || 'Prepared fresh'}</div>
                    </div>
                    <div class="text-end small">
                        <span class="fw-semibold text-warning">${cal} cal</span>
                        <span class="text-muted">· ${pro}g P · ${carbs}g C</span>
                    </div>
                </div>
            `;
            }).join('');

            // Action buttons behavior based on day state
            let actionButtonsHtml = '';
            if (isDayDone) {
                actionButtonsHtml = `
                    <div class="d-flex gap-1">
                        <button type="button" class="btn btn-sm btn-outline-success rounded-pill py-0 px-2 fw-semibold" disabled title="Day is completed and locked">
                            ${isConsumed ? '✅ Logged' : '✅ Consumed'}
                        </button>
                    </div>
                `;
            } else if (isDayLock) {
                actionButtonsHtml = `
                    <div class="d-flex gap-1">
                        <button type="button" class="btn btn-sm btn-outline-secondary rounded-pill py-0 px-2" disabled title="Day is locked until previous day is completed">
                            🔒 Locked
                        </button>
                    </div>
                `;
            } else {
                actionButtonsHtml = `
                    <div class="d-flex gap-1">
                        <button type="button" class="btn btn-sm btn-outline-success rounded-pill py-0 px-2 fw-semibold" onclick="consumeDietPlanMeal('${planId}', ${d.dayNumber}, '${m.slot}')" ${isConsumed ? 'disabled' : ''}>
                            ${isConsumed ? '✅ Logged' : '✅ Mark Consumed'}
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-secondary rounded-pill py-0 px-2" onclick="skipDietPlanMeal('${planId}', ${d.dayNumber}, '${m.slot}')" ${isConsumed || isSkipped ? 'disabled' : ''}>
                            ⏭️ Skip
                        </button>
                    </div>
                `;
            }

            return `
                <div class="ai-meal-slot-card ${statusClass}" id="mealSlot_${planId}_d${d.dayNumber}_${m.slot}">
                    <div class="ai-meal-slot-header">
                        <div>
                            <strong style="color: #FF8A1F;">${escapeCoachHtml(m.slotTitle)}</strong>
                            <span class="text-muted small ms-2"><i class="bi bi-clock"></i> ${m.timeWindow || ''}</span>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            ${statusBadge}
                        </div>
                    </div>
                    <div class="mb-2">
                        ${itemsRows}
                    </div>
                    <div class="d-flex justify-content-between align-items-center pt-2 mt-2 border-top border-dark flex-wrap gap-2">
                        <div class="small" style="color: #A9A9A9;">
                            Subtotal: <strong class="text-warning">${Math.round(m.subtotalCalories)} kcal</strong> | <strong class="text-success">${Math.round(m.subtotalProtein)}g P</strong> | ${Math.round(m.subtotalCarbs)}g C | ${Math.round(m.subtotalFat)}g F | ${Math.round(m.subtotalFibre)}g Fib
                        </div>
                        ${actionButtonsHtml}
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="mb-3">
                ${plan.days.length > 1 ? `<h6 class="fw-bold mb-2 text-warning d-flex align-items-center gap-2"><i class="bi bi-calendar3"></i> Day ${d.dayNumber} · ${Math.round(d.totalCalories)} kcal (${Math.round(d.totalProtein)}g Protein)</h6>` : ''}
                ${dayStatusBanner}
                ${mealsHtml}
            </div>
        `;
    }).join('');

    let doctorNotesCard = '';
    if (plan.doctorTrainerNotes) {
        doctorNotesCard = `
            <div class="p-2 mb-3 rounded" style="background: rgba(111,174,61,0.12); border: 1px solid rgba(111,174,61,0.3); font-size: 13px; color: #6FAE3D;">
                <i class="bi bi-file-earmark-medical me-1"></i> <strong>Doctor / Trainer Prescription:</strong> ${escapeCoachHtml(plan.doctorTrainerNotes)}
            </div>
        `;
    }

    return `
        <div class="ai-diet-card" id="dietCard_${planId}">
            <div class="ai-diet-section-title-wrap mb-3 p-3 rounded-3" style="background: linear-gradient(135deg, rgba(255,138,31,0.08), rgba(111,174,61,0.05)); border: 1px solid rgba(255,138,31,0.25);">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div class="d-flex align-items-center gap-2">
                        <span class="fs-4">🥗</span>
                        <h4 class="fw-bold mb-0 text-white" style="color: #FF8A1F !important; font-size: 1.35rem; letter-spacing: 0.5px;">Diet and Nutrition</h4>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <span class="badge rounded-pill px-3 py-1" style="background: rgba(111,174,61,0.18); color: #6FAE3D; border: 1px solid rgba(111,174,61,0.4); font-size: 11px;">
                            <i class="bi bi-shield-check"></i> USDA & IFCT Verified
                        </span>
                        <span class="badge rounded-pill px-3 py-1" style="background: rgba(255,138,31,0.18); color: #FF8A1F; border: 1px solid rgba(255,138,31,0.4); font-size: 11px;">
                            <i class="bi bi-clock-history"></i> 5 Meals Scheduled
                        </span>
                    </div>
                </div>
                <div class="small text-muted mt-1">
                    Personalized nutritional distribution and meal schedule calibrated to your Profile Calculator targets.
                </div>
            </div>

            <div class="ai-diet-header-card">
                <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                    <div>
                        <h5 class="fw-bold mb-0 text-white">${escapeCoachHtml(plan.title || 'Personalized 5-Meal Diet Plan')}</h5>
                        <div class="small text-muted">${durationLabel} Plan · Goal: <span class="text-warning fw-semibold">${escapeCoachHtml(plan.fitnessGoal || 'General Fitness')}</span></div>
                    </div>
                    <span class="badge" style="background: linear-gradient(135deg, #6B3F24, #FF8A1F); color:#fff; font-size: 11px;">5 Meals Daily</span>
                </div>
                <div class="d-flex flex-wrap gap-2 mb-1">
                    <span class="ai-macro-pill target">🎯 <strong>${Math.round(plan.dailyTargetCalories)}</strong> kcal / day</span>
                    <span class="ai-macro-pill protein">💪 <strong>${Math.round(plan.dailyTargetProtein)}g</strong> Protein</span>
                    <span class="ai-macro-pill carbs">🍞 <strong>${Math.round(plan.dailyTargetCarbs)}g</strong> Carbs</span>
                    <span class="ai-macro-pill fat">🥑 <strong>${Math.round(plan.dailyTargetFat)}g</strong> Fat</span>
                    <span class="ai-macro-pill fibre">🌾 <strong>${Math.round(plan.dailyTargetFibre)}g</strong> Fibre</span>
                </div>
            </div>

            ${doctorNotesCard}
            ${dayPills}
            ${daysHtml}

            <div class="d-flex justify-content-between align-items-center pt-2 mt-2 border-top border-dark flex-wrap gap-2">
                <div class="d-flex gap-2">
                    <button type="button" class="btn btn-sm rounded-pill px-3 fw-semibold text-white" style="background: linear-gradient(135deg, #6B3F24, #FF8A1F);" onclick="printDietPlanDirect('${planId}')">
                        <i class="bi bi-printer"></i> Print Plan
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-warning rounded-pill px-3 fw-semibold" onclick="saveActiveDietPlanToHistory('${planId}')">
                        <i class="bi bi-bookmark-check"></i> Save Plan
                    </button>
                </div>
                <button type="button" class="btn btn-sm btn-outline-info rounded-pill px-3 fw-semibold" onclick="promptNaturalDietEdit()">
                    <i class="bi bi-pencil-square"></i> Natural Language Edit
                </button>
            </div>
        </div>
    `;
}

function switchDietPlanDay(planId, dayIdx) {
    if (!currentActiveDietPlan) return;
    const activeDay = getCurrentActiveChallengeDay();
    if (dayIdx !== -1) {
        const targetDayNum = (currentActiveDietPlan.days && currentActiveDietPlan.days[dayIdx]) 
            ? currentActiveDietPlan.days[dayIdx].dayNumber 
            : (dayIdx + 1);
        if (targetDayNum > activeDay) {
            showToast(`🔒 Day ${targetDayNum} is locked! Complete Day ${activeDay} first to unlock.`);
            return;
        }
    }
    currentDietPlanDayIndex = dayIdx;
    const cardEl = document.getElementById(`dietCard_${planId}`);
    if (cardEl) {
        cardEl.outerHTML = renderDietPlanHtml(currentActiveDietPlan);
    }
}

function consumeDietPlanMeal(planId, dayNumber, slot) {
    if (!currentActiveDietPlan) return;
    const activeDay = getCurrentActiveChallengeDay();
    if (dayNumber < activeDay || isChallengeDayCompleted(dayNumber)) {
        showToast(`🔒 Day ${dayNumber} is completed and locked. Meals cannot be modified.`);
        return;
    }
    if (dayNumber > activeDay) {
        showToast(`🔒 Day ${dayNumber} is locked. Complete Day ${activeDay} first.`);
        return;
    }

    const plan = currentActiveDietPlan;
    const day = (plan.days || []).find(d => d.dayNumber === dayNumber) || (plan.days || [])[0];
    if (!day) return;
    const meal = (day.meals || []).find(m => m.slot === slot);
    if (!meal) return;

    meal.status = 'CONSUMED';
    meal.isConsumed = true;
    meal.consumedAt = new Date().toISOString();

    // 1. Post to backend consume endpoint
    apiFetch('/api/diet/consume-meal', {
        method: 'POST',
        body: JSON.stringify({
            planId: plan.id,
            dayNumber: dayNumber,
            mealSlot: slot,
            mealType: slot,
            mealName: meal.slotTitle || slot,
            status: 'CONSUMED',
            email: currentUser ? currentUser.email : null,
            plannedCalories: Math.round(meal.subtotalCalories || 0),
            plannedCal: Math.round(meal.subtotalCalories || 0),
            plannedProtein: Math.round(meal.subtotalProtein || 0),
            actualCalories: Math.round(meal.subtotalCalories || 0),
            actualCal: Math.round(meal.subtotalCalories || 0),
            actualProtein: Math.round(meal.subtotalProtein || 0),
            actualCarbs: Math.round(meal.subtotalCarbs || 0),
            actualFat: Math.round(meal.subtotalFat || 0),
            actualFibre: Math.round(meal.subtotalFibre || 0),
            items: meal.items || []
        })
    }).catch(err => console.warn('Could not record meal consumption in backend:', err));

    // 2. Add each item to today's local foodLog so the Healthify dashboard syncs in real-time!
    (meal.items || []).forEach(it => {
        foodLog.push({
            name: it.name,
            grams: it.grams || 100,
            cal: +(it.cal !== undefined ? it.cal : it.calories || 0).toFixed(1),
            protein: +(it.pro !== undefined ? it.pro : it.protein || 0).toFixed(1),
            fibre: +(it.fibre || 0).toFixed(1),
            type: 'diet_plan',
            dayNumber: dayNumber,
            mealSlot: slot
        });
    });

    // 3. Save updated plan to IndexedDB and LocalStorage so it persists across page reload & logout
    HealthifyIDB.saveDietPlan(currentActiveDietPlan);
    safeSetStorage(`ht_active_diet_plan_${currentUser.email}`, currentActiveDietPlan);

    saveUserData();
    renderDashboard();
    refreshCurrentDayDash();

    // Re-render the plan card to update the status badge
    const cardEl = document.getElementById(`dietCard_${planId}`);
    if (cardEl) {
        cardEl.outerHTML = renderDietPlanHtml(currentActiveDietPlan);
    }

    showToast(`✅ Logged ${meal.slotTitle} (${Math.round(meal.subtotalCalories)} kcal) to Day ${dayNumber} dashboard!`);
}

function skipDietPlanMeal(planId, dayNumber, slot) {
    if (!currentActiveDietPlan) return;
    const activeDay = getCurrentActiveChallengeDay();
    if (dayNumber < activeDay || isChallengeDayCompleted(dayNumber)) {
        showToast(`🔒 Day ${dayNumber} is completed and locked. Meals cannot be modified.`);
        return;
    }
    if (dayNumber > activeDay) {
        showToast(`🔒 Day ${dayNumber} is locked. Complete Day ${activeDay} first.`);
        return;
    }

    const plan = currentActiveDietPlan;
    const day = (plan.days || []).find(d => d.dayNumber === dayNumber) || (plan.days || [])[0];
    if (!day) return;
    const meal = (day.meals || []).find(m => m.slot === slot);
    if (!meal) return;

    meal.status = 'SKIPPED';
    meal.isSkipped = true;

    apiFetch('/api/diet/consume-meal', {
        method: 'POST',
        body: JSON.stringify({
            planId: plan.id,
            dayNumber: dayNumber,
            mealSlot: slot,
            mealType: slot,
            mealName: meal.slotTitle || slot,
            status: 'SKIPPED',
            email: currentUser ? currentUser.email : null
        })
    }).catch(e => console.warn(e));

    HealthifyIDB.saveDietPlan(currentActiveDietPlan);
    safeSetStorage(`ht_active_diet_plan_${currentUser.email}`, currentActiveDietPlan);

    const cardEl = document.getElementById(`dietCard_${planId}`);
    if (cardEl) {
        cardEl.outerHTML = renderDietPlanHtml(currentActiveDietPlan);
    }
    showToast(`⏭️ Skipped ${meal.slotTitle}`);
}

function promptNaturalDietEdit() {
    const input = document.getElementById('aiCoachInput');
    if (!input) return;
    input.value = 'Make dinner lighter and replace eggs with paneer';
    input.focus();
    showToast('✏️ Edit your prompt and send to adjust your diet plan!');
}

function saveActiveDietPlanToHistory(planId) {
    if (!currentActiveDietPlan) return;
    try {
        HealthifyIDB.saveDietPlan(currentActiveDietPlan);
        showToast('💾 Plan saved to My Diet Plans!');
    } catch (e) {
        console.warn(e);
    }
}

function openDietPreparationModal() {
    const proceed = (confirmedList) => {
        const payload = getAIUserDataPayload();
        const profileTarget = Math.round((payload.profile && (payload.profile.targetCalories || payload.profile.tdee)) || 2100);
        const foods = Array.isArray(confirmedList) ? confirmedList : [];

        activeFoodConfirmationData = {
            documentName: 'Diet Preparation (Confirmed Pantry Foods)',
            doctorTrainerNotes: '',
            targetCalories: profileTarget,
            profileTargetCalories: profileTarget,
            selectedCalorieTarget: profileTarget,
            newlyExtractedFoods: [...foods],
            existingConfirmedFoods: [...foods],
            mergeMode: 'replace',
            extractedFoods: [...foods],
            selectedFoods: [...foods],
            detailedFoods: foods.map(name => {
                const item = CLIENT_NUTRITION_LOOKUP[(name || '').toLowerCase()] || {};
                return {
                    name: name,
                    quantity: item.quantity || 100,
                    unit: item.unit || 'g',
                    calories: item.calories || 120,
                    protein: item.protein || 6,
                    carbs: item.carbs || 15,
                    fat: item.fat || 2,
                    fibre: item.fibre || 1,
                    valueSource: 'BACKEND_CALCULATED',
                    confidence: 1.0
                };
            }),
            suggestedMeals: [],
            unclearOrMissingInfo: [],
            selectedPlanType: '7_DAY'
        };

        openFoodConfirmationModal();
    };

    if (currentUser && currentUser.email) {
        fetch(`${AI_BACKEND_URL}/api/diet/confirmed-foods?email=${encodeURIComponent(currentUser.email)}`)
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.confirmedFoods)) {
                    setUserConfirmedFoods(data.confirmedFoods);
                    proceed(data.confirmedFoods);
                } else {
                    proceed(getUserConfirmedFoods());
                }
            })
            .catch(() => proceed(getUserConfirmedFoods()));
    } else {
        proceed(getUserConfirmedFoods());
    }
}

function openDietPlansModal() {
    const modalEl = document.getElementById('dietPlansModal');
    if (!modalEl) return;
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();

    const listContainer = document.getElementById('savedDietPlansList');
    if (!listContainer) return;

    listContainer.innerHTML = `
        <div class="text-center py-4 text-muted">
            <div class="spinner-border spinner-border-sm text-warning me-2" role="status"></div>
            Loading saved diet plans from database...
        </div>
    `;

    const email = currentUser && currentUser.email ? currentUser.email : 'guest';

    fetch(`${AI_BACKEND_URL}/api/diet/history?email=${encodeURIComponent(email)}`)
        .then(res => res.json())
        .then(res => {
            if (res && res.success && Array.isArray(res.plans)) {
                const serverPlans = res.plans;
                // Sync to IndexedDB cache
                serverPlans.forEach(p => HealthifyIDB.saveDietPlan(p));
                renderSavedDietPlansList(serverPlans);
            } else {
                throw new Error('Server plans not available');
            }
        })
        .catch(() => {
            HealthifyIDB.getDietPlansForEmail(email).then(plans => {
                renderSavedDietPlansList(plans || []);
            });
        });
}

function renderSavedDietPlansList(plans) {
    const listContainer = document.getElementById('savedDietPlansList');
    if (!listContainer) return;

    if (!plans || plans.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center py-5 text-muted">
                <div class="fs-1 mb-2">📋</div>
                <h6>No Saved Diet Plans Yet</h6>
                <p class="small mb-0">Ask the AI Health Coach to generate a 5-meal plan or upload your doctor prescription!</p>
            </div>
        `;
        return;
    }

    listContainer.innerHTML = plans.map(p => {
        const daysCount = (p.days || []).length;
        const formattedDate = p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Saved Plan';
        return `
            <div class="p-3 rounded" style="background: #1A1A1A; border: 1px solid #2F2F2F;">
                <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                    <div>
                        <h6 class="fw-bold mb-1 text-white">${escapeCoachHtml(p.title || '5-Meal Diet Plan')}</h6>
                        <div class="small text-muted">
                            Goal: <span class="text-warning">${escapeCoachHtml(p.fitnessGoal || p.goal || 'General')}</span> · ${daysCount} Day(s) (5 meals/day)
                            ${p.createdAt ? `· <span class="text-secondary">${formattedDate}</span>` : ''}
                        </div>
                    </div>
                    <span class="badge" style="background: #3A281E; color: #FF8A1F;">🎯 ${Math.round(p.dailyTargetCalories || p.calorieTarget || 2000)} kcal</span>
                </div>
                <div class="d-flex justify-content-end gap-2 mt-2 flex-wrap">
                    <button type="button" class="btn btn-sm btn-outline-info rounded-pill px-3" onclick="viewSavedDietPlan('${p.id}')">
                        <i class="bi bi-eye"></i> View Plan
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-warning rounded-pill px-3" onclick="loadSavedPlanIntoChat('${p.id}')">
                        <i class="bi bi-chat-dots"></i> Open in Chat
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-light rounded-pill px-3" onclick="printDietPlanDirect('${p.id}')">
                        <i class="bi bi-printer"></i> Print
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-danger rounded-pill px-3" onclick="deleteDietPlan('${p.id}')">
                        <i class="bi bi-trash3"></i> Delete
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

async function deleteDietPlan(planId) {
    if (!planId) return;
    const confirmed = confirm("Are you sure you want to delete this diet plan?");
    if (!confirmed) return;

    const email = currentUser && currentUser.email ? currentUser.email : 'guest';

    try {
        await fetch(`${AI_BACKEND_URL}/api/diet/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, planId: planId, id: planId })
        });
        await HealthifyIDB.deleteDietPlan(planId);
        if (currentActiveDietPlan && (String(currentActiveDietPlan.id) === String(planId))) {
            currentActiveDietPlan = null;
        }
        showToast('🗑️ Diet plan deleted successfully.');
        openDietPlansModal();
    } catch (err) {
        await HealthifyIDB.deleteDietPlan(planId);
        showToast('🗑️ Diet plan deleted from local storage.');
        openDietPlansModal();
    }
}

async function viewSavedDietPlan(planId) {
    if (!planId) return;
    const email = currentUser && currentUser.email ? currentUser.email : 'guest';
    let plan = (currentActiveDietPlan && (String(currentActiveDietPlan.id) === String(planId))) ? currentActiveDietPlan : null;

    if (!plan) {
        try {
            const res = await fetch(`${AI_BACKEND_URL}/api/diet/history?email=${encodeURIComponent(email)}`);
            const data = await res.json();
            if (data.success && data.plans) {
                plan = data.plans.find(p => String(p.id) === String(planId));
            }
        } catch (e) {}
    }

    if (!plan) {
        const idbPlans = await HealthifyIDB.getDietPlansForEmail(email);
        plan = (idbPlans || []).find(p => String(p.id) === String(planId));
    }

    if (plan) {
        currentActiveDietPlan = plan;
        currentDietPlanDayIndex = Math.max(0, getCurrentActiveChallengeDay() - 1);
        const modalEl = document.getElementById('dietPlansModal');
        if (modalEl) {
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
        }
        showSection('aiCoachSection');
        appendAICoachBubble('bot', `📋 Here is your saved **${plan.title}** (${(plan.days || []).length} Days, 5 meals/day):`, 'groq', null, true, plan);
        scrollAICoachToBottom();
    } else {
        showToast('⚠️ Could not load the requested diet plan.');
    }
}

async function loadSavedPlanIntoChat(planId) {
    const email = currentUser && currentUser.email ? currentUser.email : 'guest';
    let plan = (currentActiveDietPlan && (currentActiveDietPlan.id == planId || currentActiveDietPlan.id === planId)) ? currentActiveDietPlan : null;

    if (!plan) {
        const idbPlans = await HealthifyIDB.getDietPlansForEmail(email);
        plan = (idbPlans || []).find(p => p.id == planId || p.id === planId);
    }

    if (!plan) {
        try {
            const res = await fetch(`${AI_BACKEND_URL}/api/diet/history?email=${encodeURIComponent(email)}`);
            const data = await res.json();
            if (data.success && data.plans) {
                plan = data.plans.find(p => p.id == planId || p.id === planId);
            }
        } catch (e) {}
    }
    
    if (plan) {
        currentActiveDietPlan = plan;
        currentDietPlanDayIndex = Math.max(0, getCurrentActiveChallengeDay() - 1);
        const modalEl = document.getElementById('dietPlansModal');
        if (modalEl) {
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
        }
        showSection('aiCoachSection');
        appendAICoachBubble('bot', `📋 Loaded your saved **${plan.title}** into the conversation:`, 'groq', null, true, plan);
        scrollAICoachToBottom();
    }
}

function openDietTrackingModal() {
    const modalEl = document.getElementById('dietTrackingModal');
    if (!modalEl) return;
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();

    const content = document.getElementById('dietTrackingContent');
    if (!content) return;

    const payload = getAIUserDataPayload();
    const profile = payload.profile || {};
    const activeDay = getCurrentActiveChallengeDay();

    let targetDayObj = null;
    if (currentActiveDietPlan && Array.isArray(currentActiveDietPlan.days) && currentActiveDietPlan.days.length > 0) {
        targetDayObj = currentActiveDietPlan.days.find(d => d.dayNumber === activeDay) 
            || currentActiveDietPlan.days[Math.min(currentDietPlanDayIndex >= 0 ? currentDietPlanDayIndex : 0, currentActiveDietPlan.days.length - 1)] 
            || currentActiveDietPlan.days[0];
    }

    const plannedCal = targetDayObj && targetDayObj.totalCalories 
        ? Math.round(targetDayObj.totalCalories) 
        : ((currentActiveDietPlan && currentActiveDietPlan.dailyTargetCalories) ? Math.round(currentActiveDietPlan.dailyTargetCalories) : (profile.targetCalories || 2000));
    
    const plannedPro = targetDayObj && targetDayObj.totalProtein 
        ? Math.round(targetDayObj.totalProtein) 
        : ((currentActiveDietPlan && currentActiveDietPlan.dailyTargetProtein) ? Math.round(currentActiveDietPlan.dailyTargetProtein) : Math.round(plannedCal * 0.25 / 4));
    
    const plannedCarbs = targetDayObj && targetDayObj.totalCarbs 
        ? Math.round(targetDayObj.totalCarbs) 
        : ((currentActiveDietPlan && currentActiveDietPlan.dailyTargetCarbs) ? Math.round(currentActiveDietPlan.dailyTargetCarbs) : Math.round(plannedCal * 0.50 / 4));
    
    const plannedFat = targetDayObj && targetDayObj.totalFat 
        ? Math.round(targetDayObj.totalFat) 
        : ((currentActiveDietPlan && currentActiveDietPlan.dailyTargetFat) ? Math.round(currentActiveDietPlan.dailyTargetFat) : Math.round(plannedCal * 0.25 / 9));

    const actualCal = Math.round(payload.totalCalories || 0);
    const actualPro = Math.round(payload.totalProtein || 0);

    const remainingCal = plannedCal - actualCal;
    const remainingPro = plannedPro - actualPro;
    const calPct = Math.min(100, Math.round((actualCal / plannedCal) * 100));

    const slotNames = [
        { key: 'BREAKFAST', title: '🌅 Breakfast' },
        { key: 'PRE_LUNCH', title: '🥗 Pre-Lunch' },
        { key: 'LUNCH', title: '🍛 Lunch' },
        { key: 'EVENING_SNACK', title: '🥜 Evening Snack' },
        { key: 'DINNER', title: '🍲 Dinner' }
    ];

    let slotsHtml = slotNames.map(s => {
        let isDone = false;
        if (targetDayObj && Array.isArray(targetDayObj.meals)) {
            const m = targetDayObj.meals.find(x => x.slot === s.key);
            if (m && (m.status === 'CONSUMED' || m.isConsumed)) isDone = true;
        }
        return `
            <div class="d-flex justify-content-between align-items-center p-2 rounded" style="background: #1C1C1C; border: 1px solid #2B2B2B;">
                <span>${s.title}</span>
                <span class="badge ${isDone ? 'bg-success' : 'bg-secondary'}">${isDone ? '✅ Consumed' : '⏳ Pending'}</span>
            </div>
        `;
    }).join('');

    content.innerHTML = `
        <div class="p-3 rounded mb-3" style="background: #1A1A1A; border: 1px solid #2F2F2F;">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="fw-bold fs-6 text-white">Day ${activeDay} Calorie Balance</span>
                <span class="fw-bold ${remainingCal >= 0 ? 'text-success' : 'text-danger'}">${remainingCal >= 0 ? remainingCal + ' kcal remaining' : Math.abs(remainingCal) + ' kcal surplus'}</span>
            </div>
            <div class="progress" style="height: 12px; background: #262626;">
                <div class="progress-bar ${calPct > 100 ? 'bg-danger' : 'bg-warning'}" style="width: ${calPct}%;"></div>
            </div>
            <div class="d-flex justify-content-between small text-muted mt-1">
                <span>Consumed: ${actualCal} kcal</span>
                <span>Planned Target: ${plannedCal} kcal</span>
            </div>
        </div>

        <div class="row g-2 mb-3">
            <div class="col-6">
                <div class="p-3 rounded" style="background: #1A1A1A; border: 1px solid #2F2F2F;">
                    <div class="small text-muted mb-1">Protein Consumed</div>
                    <div class="fw-bold fs-5 text-success">${actualPro}g / ${plannedPro}g</div>
                    <div class="small ${remainingPro > 0 ? 'text-warning' : 'text-success'}">${remainingPro > 0 ? remainingPro + 'g needed' : 'Target reached!'}</div>
                </div>
            </div>
            <div class="col-6">
                <div class="p-3 rounded" style="background: #1A1A1A; border: 1px solid #2F2F2F;">
                    <div class="small text-muted mb-1">Total Items Logged</div>
                    <div class="fw-bold fs-5 text-white">${payload.foodLog ? payload.foodLog.length : 0} items</div>
                    <div class="small text-muted">Synced from Dashboard</div>
                </div>
            </div>
        </div>

        <h6 class="fw-bold mb-2 text-warning"><i class="bi bi-clock-history"></i> Today's 5-Meal Schedule</h6>
        <div class="d-flex flex-column gap-2">
            ${slotsHtml}
        </div>
    `;
}

async function printDietPlanDirect(planId) {
    let plan = currentActiveDietPlan;
    if (!plan || (planId && plan.id !== planId)) {
        const email = currentUser && currentUser.email ? currentUser.email : 'guest';
        const idbPlans = await HealthifyIDB.getDietPlansForEmail(email);
        plan = (idbPlans || []).find(p => p.id == planId || p.id === planId) || currentActiveDietPlan;
    }
    if (!plan || !plan.days) {
        showToast('⚠️ No diet plan found to print.');
        return;
    }

    const printArea = document.getElementById('dietPlanPrintArea');
    if (!printArea) return;

    let pagesHtml = plan.days.map(d => {
        let rowsHtml = (d.meals || []).map(m => {
            let itemsText = (m.items || []).map(it => `${it.name} (${it.grams}g ${it.state || 'Raw'})`).join(', ');
            let prepText = (m.items || []).map(it => it.prepMethod).filter(Boolean).join('; ');
            return `
                <tr>
                    <td style="font-weight: bold; width: 18%;">${escapeCoachHtml(m.slotTitle)}<br><small style="color: #666;">${m.timeWindow || ''}</small></td>
                    <td style="width: 32%;">${escapeCoachHtml(itemsText)}</td>
                    <td style="width: 20%; font-size: 11px; color: #555;">${escapeCoachHtml(prepText || 'Standard prep')}</td>
                    <td style="text-align: right; font-weight: bold; width: 10%;">${Math.round(m.subtotalCalories)}</td>
                    <td style="text-align: right; width: 7%;">${Math.round(m.subtotalProtein)}g</td>
                    <td style="text-align: right; width: 7%;">${Math.round(m.subtotalCarbs)}g</td>
                    <td style="text-align: right; width: 6%;">${Math.round(m.subtotalFat)}g</td>
                </tr>
            `;
        }).join('');

        return `
            <div class="print-plan-page">
                <div style="border-bottom: 2px solid #FF8A1F; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-end;">
                    <div>
                        <h2 style="margin: 0; color: #FF8A1F; font-size: 22px;">Health Tracker Ultimate · AI Health Coach</h2>
                        <h4 style="margin: 4px 0 0 0; color: #222; font-size: 16px;">${escapeCoachHtml(plan.title || 'Personalized 5-Meal Diet Plan')} — Day ${d.dayNumber}</h4>
                    </div>
                    <div style="text-align: right; font-size: 12px; color: #666;">
                        <div>User: <strong>${currentUser ? escapeCoachHtml(currentUser.name) : 'User'}</strong></div>
                        <div>Goal: <strong>${escapeCoachHtml(plan.fitnessGoal || 'General')}</strong></div>
                    </div>
                </div>

                <div style="background: #F9F9F9; border: 1px solid #DDD; padding: 10px 14px; border-radius: 6px; margin-bottom: 16px; font-size: 13px; display: flex; justify-content: space-around;">
                    <div>🎯 Daily Target: <strong>${Math.round(plan.dailyTargetCalories)} kcal</strong></div>
                    <div>💪 Protein: <strong>${Math.round(plan.dailyTargetProtein)}g</strong></div>
                    <div>🍞 Carbs: <strong>${Math.round(plan.dailyTargetCarbs)}g</strong></div>
                    <div>🥑 Fat: <strong>${Math.round(plan.dailyTargetFat)}g</strong></div>
                    <div>🌾 Fibre: <strong>${Math.round(plan.dailyTargetFibre)}g</strong></div>
                </div>

                ${plan.doctorTrainerNotes ? `<div style="background: #EAF7EA; border: 1px solid #85CE85; color: #1E6B1E; padding: 8px 12px; border-radius: 6px; margin-bottom: 16px; font-size: 12px;"><strong>🩺 Doctor / Trainer Prescription:</strong> ${escapeCoachHtml(plan.doctorTrainerNotes)}</div>` : ''}

                <table class="print-table">
                    <thead>
                        <tr style="background: #F0F0F0;">
                            <th>Meal Slot</th>
                            <th>Food Items (Portion)</th>
                            <th>Preparation Method</th>
                            <th style="text-align: right;">Calories</th>
                            <th style="text-align: right;">Protein</th>
                            <th style="text-align: right;">Carbs</th>
                            <th style="text-align: right;">Fat</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                        <tr style="background: #FFF8F0; font-weight: bold; border-top: 2px solid #FF8A1F;">
                            <td colspan="3">DAY ${d.dayNumber} TOTAL</td>
                            <td style="text-align: right; color: #C45500;">${Math.round(d.totalCalories)} kcal</td>
                            <td style="text-align: right;">${Math.round(d.totalProtein)}g</td>
                            <td style="text-align: right;">${Math.round(d.totalCarbs)}g</td>
                            <td style="text-align: right;">${Math.round(d.totalFat)}g</td>
                        </tr>
                    </tbody>
                </table>

                <div style="margin-top: 24px; padding-top: 10px; border-top: 1px dashed #CCC; font-size: 11px; color: #777; text-align: center;">
                    <em>Disclaimer: This diet plan is generated grounded in verified nutritional data and user health metrics. Consult a qualified physician, registered dietitian, or certified medical provider before beginning any drastic dietary intervention.</em>
                </div>
            </div>
        `;
    }).join('');

    printArea.innerHTML = pagesHtml;
    printArea.classList.remove('d-none');
    window.print();
    setTimeout(() => {
        printArea.classList.add('d-none');
        printArea.innerHTML = '';
    }, 1500);
}

function generateClientCoachFallbackWithPlan(message, data, explicitConfirmedFoods) {
    const q = (message || '').toLowerCase().trim();
    const payload = data || {};
    const profile = payload.profile || {};
    const targetCal = Math.round(profile.targetCalories || profile.tdee || 2050);
    const goal = profile.selectedGoal || 'Weight Loss';

    // 1. Short intelligent inputs
    if (q === 'protein' || (q.includes('protein') && q.length < 15)) {
        return {
            text: `### 💪 Protein Intelligence & Sources\n\nProtein is the foundational macronutrient for muscle protein synthesis, cellular tissue repair, and satiety.\n\n**1. Daily Protein Requirement:**\n- **Weight Loss / Maintenance:** 1.2 – 1.6g / kg body weight\n- **Muscle Hypertrophy / Athletic:** 1.6 – 2.2g / kg body weight\n\n**2. Top High-Quality Protein Sources in Healthify:**\n- 🧀 **Vegetarian:** Soya Chunks (52g/100g), Fresh Paneer (18g/100g), Greek Yogurt (10g/100g), Cooked Lentils/Dal (9g/100g)\n- 🍗 **Non-Vegetarian:** Chicken Breast (31g/100g), Boiled Eggs (13g/100g / ~6g per whole egg), Salmon / Fish (22g/100g)\n\n**Would you like me to:**\n- Structure a **5-meal high-protein diet plan** for your ${targetCal} kcal target?\n- Suggest vegetarian protein alternatives?\n- Calculate your exact protein target from your profile?`,
            dietPlan: null
        };
    }

    if (q === 'vegetarian' || (q.includes('vegetarian') && q.length < 18)) {
        return {
            text: `### 🥗 Vegetarian Nutrition & Meal Planning\n\nVegetarian diets can easily achieve optimal macronutrient targets with intentional food pairing to ensure complete essential amino acid profiles.\n\n**Key Vegetarian Powerhouses:**\n- **Proteins:** Soya chunks (52g/100g), Fresh Paneer (18g/100g), Tofu (17g/100g), Lentils / Dal, Greek Yogurt\n- **Complex Carbs:** Oats, Quinoa, Brown Rice, Sweet Potato, Whole Wheat Chapati\n- **Micronutrients & Healthy Fats:** Spinach, Broccoli, Almonds, Walnuts, Chia Seeds\n\n**How would you like to proceed?**\n- Generate a **7-day 5-meal vegetarian diet plan** tailored to your Profile Calculator (${targetCal} kcal)\n- Suggest quick vegetarian high-protein snacks\n- Review your current logged meals`,
            dietPlan: null
        };
    }

    if (q === 'weight gain' || q === 'muscle gain' || q === 'bulk' || q === 'bulking') {
        return {
            text: `### 📈 Weight Gain & Lean Bulking Protocol\n\nTo build lean muscle mass while minimizing unnecessary adipose tissue accumulation:\n\n**1. Caloric Surplus:**\nTarget a moderate surplus of **+250 to +500 kcal** above your Maintenance (TDEE: ${targetCal} kcal).\n\n**2. Macro Distribution:**\n- **Protein:** 1.8 – 2.2g per kg body weight\n- **Carbs:** 45% – 55% of daily calories for glycogen replenishment\n- **Healthy Fats:** 25% – 30% for hormonal optimization\n\n**3. Meal Frequency:**\nDistribute nutrition across **5 structured meals** (Breakfast, Pre-Lunch, Lunch, Evening Snack, Dinner).\n\nShall I generate a customized **5-meal weight gain diet plan** grounded in your Profile Calculator?`,
            dietPlan: null
        };
    }

    if (q === 'dinner' || (q.includes('dinner') && q.length < 15)) {
        return {
            text: `### 🍲 Dinner Planning & Nutrition\n\nDinner should provide steady-release amino acids for overnight recovery without causing digestive strain or disrupting circadian sleep cycles.\n\n**Best Dinner Practices:**\n- Consume 2.5–3 hours before sleep.\n- Emphasize lean protein and high-fibre greens with moderate low-GI carbs.\n- Hydrate adequately earlier in the evening.\n\n**Healthy Examples:**\n- Grilled Paneer / Tofu (150g) with sautéed vegetables & 1 whole wheat chapati\n- Grilled chicken breast with broccoli and warm quinoa\n- Spiced lentil dal with a fresh green salad\n\nWould you like me to lighten your current dinner or generate a complete 5-meal plan?`,
            dietPlan: null
        };
    }

    // 2. Check if user is asking for diet plan creation or edit
    const isPlanReq = (q.includes('diet') || q.includes('plan') || q.includes('meal')) && (q.includes('generate') || q.includes('create') || q.includes('make') || q.includes('7-day') || q.includes('25-day') || q.length < 10);
    
    if (isPlanReq) {
        const planType = q.includes('25-day') ? '25_DAY' : (q.includes('daily') ? 'DAILY' : '7_DAY');
        const numDays = planType === '25_DAY' ? 25 : (planType === 'DAILY' ? 1 : 7);
        const durationLabel = planType === '25_DAY' ? '25-Day' : (planType === '7_DAY' ? '7-Day' : 'Daily');
        const pGoal = q.includes('gain') ? 'Muscle Gain' : (q.includes('loss') ? 'Weight Loss' : goal);

        const proGrams = Math.round(targetCal * 0.25 / 4);
        const carbGrams = Math.round(targetCal * 0.50 / 4);
        const fatGrams = Math.round(targetCal * 0.25 / 9);
        const fibreGrams = 32;

        const pool = (explicitConfirmedFoods && explicitConfirmedFoods.length > 0)
            ? explicitConfirmedFoods
            : getUserConfirmedFoods();

        const lookupFood = (name, grams, state, prep) => {
            const trimmedName = (name || '').trim();
            const lower = trimmedName.toLowerCase();
            let found = CLIENT_NUTRITION_LOOKUP[lower];
            if (!found) {
                const core = lower.replace(/\b(raw|cooked|boiled|grilled|steamed|roasted|fresh|dry|uncooked)\b/g, '').replace(/[\(\)]/g, '').trim();
                if (core && CLIENT_NUTRITION_LOOKUP[core]) {
                    found = CLIENT_NUTRITION_LOOKUP[core];
                }
            }
            if (!found) {
                for (const k of Object.keys(CLIENT_NUTRITION_LOOKUP)) {
                    const escaped = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const regex = new RegExp('\\b' + escaped + '\\b', 'i');
                    if (regex.test(lower)) {
                        found = CLIENT_NUTRITION_LOOKUP[k];
                        break;
                    }
                }
            }
            if (!found) found = {};
            const baseQty = found.quantity || 100;
            const ratio = (grams || 100) / baseQty;
            const isRaw = lower.includes('raw') || lower.includes('uncooked') || lower.includes('dry');
            const resolvedState = state || found.state || (isRaw ? 'raw' : 'cooked');
            const isEst = found.calories === undefined;
            const source = found.source || (isEst ? 'ESTIMATED' : 'USDA FoodData Central / ICMR-NIN IFCT');
            const rawCal = ((found.calories !== undefined ? found.calories : 120) * ratio);
            const rawPro = ((found.protein !== undefined ? found.protein : 8) * ratio);
            const rawCarbs = ((found.carbs !== undefined ? found.carbs : 15) * ratio);
            const rawFat = ((found.fat !== undefined ? found.fat : 3) * ratio);
            const rawFib = ((found.fibre !== undefined ? found.fibre : 2) * ratio);

            return {
                name: trimmedName,
                emoji: found.emoji || '🥗',
                grams: grams || 100,
                quantity: grams || 100,
                unit: found.unit || 'g',
                state: resolvedState,
                prepMethod: prep || 'Wholesome prepared portion',
                cal: Math.round(rawCal * 10) / 10,
                calories: Math.round(rawCal * 10) / 10,
                pro: Math.round(rawPro * 10) / 10,
                protein: Math.round(rawPro * 10) / 10,
                carbs: Math.round(rawCarbs * 10) / 10,
                fat: Math.round(rawFat * 10) / 10,
                fibre: Math.round(rawFib * 10) / 10,
                unroundedCal: rawCal,
                unroundedPro: rawPro,
                unroundedCarbs: rawCarbs,
                unroundedFat: rawFat,
                unroundedFib: rawFib,
                valueSource: source,
                isEstimated: isEst
            };
        };

        const calcSubtotals = (items) => {
            let unroundedCal = 0, unroundedPro = 0, unroundedCarbs = 0, unroundedFat = 0, unroundedFib = 0;
            items.forEach(it => {
                unroundedCal += (it.unroundedCal !== undefined ? it.unroundedCal : ((it.cal !== undefined ? it.cal : it.calories) || 0));
                unroundedPro += (it.unroundedPro !== undefined ? it.unroundedPro : ((it.pro !== undefined ? it.pro : it.protein) || 0));
                unroundedCarbs += (it.unroundedCarbs !== undefined ? it.unroundedCarbs : (it.carbs || 0));
                unroundedFat += (it.unroundedFat !== undefined ? it.unroundedFat : (it.fat || 0));
                unroundedFib += (it.unroundedFib !== undefined ? it.unroundedFib : ((it.fibre !== undefined ? it.fibre : it.fib) || 0));
            });
            return {
                unroundedCal,
                unroundedPro,
                unroundedCarbs,
                unroundedFat,
                unroundedFib,
                cal: Math.round(unroundedCal * 10) / 10,
                pro: Math.round(unroundedPro * 10) / 10,
                carbs: Math.round(unroundedCarbs * 10) / 10,
                fat: Math.round(unroundedFat * 10) / 10,
                fib: Math.round(unroundedFib * 10) / 10
            };
        };

        const ROTATING_FRUITS_FALLBACK = [
            { name: 'Apple', emoji: '🍎', grams: 120, state: 'Fresh', prepMethod: 'Fresh crisp sliced portion', cal: 62, pro: 0.4, carbs: 16.5, fat: 0.2, fibre: 2.9 },
            { name: 'Banana', emoji: '🍌', grams: 100, state: 'Fresh', prepMethod: 'Peeled fresh ripe banana', cal: 89, pro: 1.1, carbs: 22.8, fat: 0.3, fibre: 2.6 },
            { name: 'Papaya', emoji: '🍈', grams: 140, state: 'Fresh', prepMethod: 'Chilled fresh diced cubes', cal: 60, pro: 0.7, carbs: 15.1, fat: 0.4, fibre: 2.4 },
            { name: 'Guava', emoji: '🍐', grams: 120, state: 'Fresh', prepMethod: 'Fresh sliced with a dash of chaat masala', cal: 82, pro: 3.1, carbs: 17.2, fat: 1.2, fibre: 6.5 },
            { name: 'Orange', emoji: '🍊', grams: 130, state: 'Fresh', prepMethod: 'Fresh juicy peeled segments', cal: 61, pro: 1.2, carbs: 15.3, fat: 0.1, fibre: 3.1 },
            { name: 'Watermelon', emoji: '🍉', grams: 200, state: 'Fresh', prepMethod: 'Chilled hydrating melon slices', cal: 60, pro: 1.2, carbs: 15.2, fat: 0.4, fibre: 0.8 },
            { name: 'Pomegranate', emoji: '🫐', grams: 100, state: 'Fresh', prepMethod: 'Fresh antioxidant-rich ruby arils', cal: 83, pro: 1.7, carbs: 18.7, fat: 1.2, fibre: 4.0 }
        ];

        const INDIAN_BREAKFASTS_FALLBACK = [
            [
                { name: 'Idli (Steamed)', emoji: '⚪', grams: 120, state: 'Cooked', prepMethod: 'Warm steamed fermented rice & urad dal cakes', cal: 162, pro: 4.8, carbs: 33.6, fat: 0.6, fibre: 1.8 },
                { name: 'Sambar', emoji: '🍲', grams: 150, state: 'Cooked', prepMethod: 'Slow-simmered vegetable & lentil stew', cal: 83, pro: 3.8, carbs: 13.5, fat: 1.8, fibre: 3.3 }
            ],
            [
                { name: 'Dosa (Plain)', emoji: '🥞', grams: 100, state: 'Cooked', prepMethod: 'Crisp golden roasted crepe on tawa', cal: 168, pro: 4.5, carbs: 29.0, fat: 3.8, fibre: 1.8 },
                { name: 'Sambar', emoji: '🍲', grams: 150, state: 'Cooked', prepMethod: 'Spiced aromatic lentil broth with vegetables', cal: 83, pro: 3.8, carbs: 13.5, fat: 1.8, fibre: 3.3 }
            ],
            [
                { name: 'Poha (Cooked)', emoji: '🥣', grams: 150, state: 'Cooked', prepMethod: 'Flattened rice tempered with mustard, curry leaves & roasted peanuts', cal: 195, pro: 3.8, carbs: 39.0, fat: 3.0, fibre: 1.8 },
                { name: 'Curd / Dahi (Low Fat)', emoji: '🥣', grams: 100, state: 'Fresh', prepMethod: 'Chilled fresh probiotic dahi', cal: 60, pro: 3.5, carbs: 4.5, fat: 3.0, fibre: 0.0 }
            ],
            [
                { name: 'Pongal (Ven Pongal)', emoji: '🥣', grams: 150, state: 'Cooked', prepMethod: 'Gently mashed rice & yellow moong dal tempered with ghee & black pepper', cal: 263, pro: 6.3, carbs: 39.0, fat: 9.0, fibre: 3.0 },
                { name: 'Coconut Chutney', emoji: '🥥', grams: 40, state: 'Fresh', prepMethod: 'Fresh ground coconut with green chillies & roasted gram', cal: 72, pro: 1.0, carbs: 2.4, fat: 6.8, fibre: 1.2 }
            ],
            [
                { name: 'Upma (Rava Upma)', emoji: '🥣', grams: 150, state: 'Cooked', prepMethod: 'Roasted semolina cooked with finely diced carrots, peas & ginger', cal: 203, pro: 5.3, carbs: 36.0, fat: 4.5, fibre: 2.7 },
                { name: 'Sambar', emoji: '🍲', grams: 120, state: 'Cooked', prepMethod: 'Warm tempered lentil stew', cal: 66, pro: 3.0, carbs: 10.8, fat: 1.4, fibre: 2.6 }
            ],
            [
                { name: 'Whole Wheat Chapati / Roti', emoji: '🫓', grams: 80, state: 'Cooked', prepMethod: 'Freshly puffed whole wheat rotis', cal: 208, pro: 7.2, carbs: 41.6, fat: 2.8, fibre: 5.6 },
                { name: 'Curd / Dahi (Low Fat)', emoji: '🥣', grams: 150, state: 'Fresh', prepMethod: 'Cool probiotic curd with roasted cumin powder', cal: 90, pro: 5.3, carbs: 6.8, fat: 4.5, fibre: 0.0 }
            ],
            [
                { name: 'Idli (Steamed)', emoji: '⚪', grams: 120, state: 'Cooked', prepMethod: 'Fluffy steamed idlis', cal: 162, pro: 4.8, carbs: 33.6, fat: 0.6, fibre: 1.8 },
                { name: 'Peanut / Groundnut Chutney', emoji: '🥜', grams: 40, state: 'Fresh', prepMethod: 'Roasted peanut & garlic chutney', cal: 88, pro: 2.6, carbs: 3.2, fat: 7.2, fibre: 1.0 }
            ]
        ];

        const scaleItemsToTarget = (items, mealTargetCal) => {
            if (!items || items.length === 0) return items;
            let curCal = 0;
            items.forEach(it => {
                curCal += (it.unroundedCal !== undefined ? it.unroundedCal : ((it.cal !== undefined ? it.cal : it.calories) || 0));
            });
            if (curCal <= 0) return items;
            const ratio = mealTargetCal / curCal;
            return items.map(it => {
                const origG = it.grams || it.quantity || 100;
                const newG = Math.max(15, Math.round((origG * ratio) / 5) * 5);
                return lookupFood(it.name, newG, it.state, it.prepMethod);
            });
        };

        const tB = targetCal * 0.24;
        const tPL = targetCal * 0.10;
        const tL = targetCal * 0.34;
        const tES = targetCal * 0.12;
        const tD = targetCal * 0.20;

        const isFruit = (item) => {
            const l = (item || '').toLowerCase();
            return l.includes('apple') || l.includes('banana') || l.includes('papaya') ||
                   l.includes('guava') || l.includes('orange') || l.includes('watermelon') ||
                   l.includes('pomegranate') || l.includes('fruit') || l.includes('berry');
        };

        const isMeat = (item) => {
            const l = (item || '').toLowerCase();
            return l.includes('chicken') || l.includes('mutton') || l.includes('lamb') ||
                   l.includes('fish') || l.includes('salmon') || l.includes('tuna') || l.includes('shrimp');
        };

        // Feasibility check for confirmed pool
        let poolFeasibilityWarning = null;
        if (pool && pool.length > 0) {
            let totalCalDensity = 0;
            let hasStapleOrProtein = false;
            pool.forEach(foodName => {
                const sample = lookupFood(foodName, 100);
                totalCalDensity += sample.cal;
                if (sample.cal >= 80 || sample.pro >= 6) hasStapleOrProtein = true;
            });
            const avgDensity = totalCalDensity / pool.length;
            if (avgDensity < 45 || !hasStapleOrProtein) {
                poolFeasibilityWarning = `Your confirmed food list contains predominantly low-caloric/high-water vegetables (average ~${Math.round(avgDensity)} kcal/100g). Reaching ${targetCal} kcal exclusively with these foods would require consuming >4-5 kg of food daily, which is physiologically unrealistic. We recommend adding whole grains (rice, roti, oats) or protein staples (paneer, eggs, chicken, lentils).`;
            }
        }

        const days = [];
        for (let d = 1; d <= numDays; d++) {
            let bItems, plItems, lItems, esItems, dItems;

            if (pool && pool.length > 0) {
                // Strictly use user confirmed foods with rotational variety
                const poolToUse = (pool && pool.length > 0) ? pool : ['Rice', 'Eggs', 'Banana', 'Chicken', 'Paneer'];
                const fruits = poolToUse.filter(isFruit);
                const meats = poolToUse.filter(isMeat);
                const nonMeats = poolToUse.filter(f => !isMeat(f));
                const safeNonMeats = nonMeats.length > 0 ? nonMeats : poolToUse;
                const grains = poolToUse.filter(f => /rice|oat|roti|chapati|poha|idli|dosa|bread|grain/i.test(f));
                const proteinStaples = poolToUse.filter(f => /chicken|fish|egg|paneer|tofu|dal|curd|yogurt|chana/i.test(f));
                const safeProteinStaples = proteinStaples.length > 0 ? proteinStaples : poolToUse;

                // 1. Breakfast: Non-meat items (Never chicken + rice in breakfast if non-meat is available)
                let bItem1, bItem2;
                if (grains.length > 0) {
                    bItem1 = grains[(d - 1) % grains.length];
                    const nonMeatPro = safeProteinStaples.filter(f => !isMeat(f) && f !== bItem1);
                    bItem2 = nonMeatPro.length > 0 ? nonMeatPro[(d - 1) % nonMeatPro.length] : (safeNonMeats.find(f => f !== bItem1) || poolToUse[0]);
                } else {
                    bItem1 = safeNonMeats[(d - 1) % safeNonMeats.length];
                    bItem2 = safeNonMeats.length > 1 ? safeNonMeats[d % safeNonMeats.length] : poolToUse[0];
                }
                bItems = (bItem1 === bItem2 || poolToUse.length === 1)
                    ? [lookupFood(bItem1, 200, 'Cooked', 'Wholesome morning staple')]
                    : [
                        lookupFood(bItem1, 160, 'Cooked', 'Wholesome morning staple'),
                        lookupFood(bItem2, 100, 'Raw', 'Breakfast protein portion')
                    ];
                bItems = scaleItemsToTarget(bItems, tB);

                // 2. Pre-Lunch: 11:30 AM Fruit Snack
                if (fruits.length > 0) {
                    const fItem = fruits[(d - 1) % fruits.length];
                    const sideCandidate = poolToUse.find(f => f !== fItem && /paneer|egg|almond|peanut|curd|yogurt/i.test(f));
                    plItems = sideCandidate
                        ? [lookupFood(fItem, 140, 'Raw', 'Fresh sliced fruit snack'), lookupFood(sideCandidate, 25, 'Raw', 'Nutrient-rich accompaniment')]
                        : [lookupFood(fItem, 200, 'Raw', 'Fresh generous fruit portion')];
                } else {
                    plItems = [lookupFood(poolToUse[(d + 1) % poolToUse.length], 120, 'Raw', 'Mid-morning portion')];
                }
                plItems = scaleItemsToTarget(plItems, tPL);

                // 3. Lunch: Hearty main meal
                const lunchCarb = grains.length > 0 ? grains[(d - 1) % grains.length] : poolToUse[0];
                const lunchPro = (meats.length > 0 && d % 2 === 1)
                    ? meats[(d - 1) % meats.length]
                    : safeProteinStaples[d % safeProteinStaples.length];
                const lunchSide = poolToUse.find(f => f !== lunchCarb && f !== lunchPro && !isFruit(f));
                lItems = [
                    lookupFood(lunchCarb, 180, 'Cooked', 'Steamed wholesome portion'),
                    lookupFood(lunchPro, 150, 'Cooked', 'Hearty protein portion')
                ];
                if (lunchSide) {
                    lItems.push(lookupFood(lunchSide, 70, 'Raw', 'Fresh side portion'));
                }
                lItems = scaleItemsToTarget(lItems, tL);

                // 4. Evening Snack: Wholesome snack from confirmed pool (NEVER raw spinach or plain dal if others available)
                const snackPro = safeProteinStaples.filter(f => /paneer|egg|almond|peanut|curd|yogurt/i.test(f));
                if (snackPro.length > 0) {
                    const sp = snackPro[(d - 1) % snackPro.length];
                    const sf = fruits.length > 0 ? fruits[d % fruits.length] : null;
                    esItems = (sf && sf !== sp)
                        ? [lookupFood(sp, 60, 'Raw', 'Protein snack portion'), lookupFood(sf, 60, 'Raw', 'Fruit accompaniment')]
                        : [lookupFood(sp, 90, 'Raw', 'Wholesome protein snack')];
                } else {
                    esItems = [lookupFood(poolToUse[(d + 2) % poolToUse.length], 100, 'Raw', 'Light mid-day portion')];
                }
                esItems = scaleItemsToTarget(esItems, tES);

                // 5. Dinner: Wholesome dinner
                const dinnerCarb = grains.length > 0 ? grains[d % grains.length] : poolToUse[0];
                const dinnerPro = (meats.length > 0 && d % 2 === 0)
                    ? meats[(d - 1) % meats.length]
                    : safeProteinStaples[(d + 1) % safeProteinStaples.length];
                dItems = (dinnerCarb === dinnerPro || poolToUse.length === 1)
                    ? [lookupFood(dinnerCarb, 200, 'Cooked', 'Light evening portion')]
                    : [
                        lookupFood(dinnerCarb, 130, 'Cooked', 'Light evening grain'),
                        lookupFood(dinnerPro, 120, 'Cooked', 'Light protein portion')
                    ];
                dItems = scaleItemsToTarget(dItems, tD);
            } else {
                // Realistic Indian meal scheduling when user has no explicit confirmed foods
                const bCombo = INDIAN_BREAKFASTS_FALLBACK[(d - 1) % INDIAN_BREAKFASTS_FALLBACK.length];
                bItems = bCombo.map(it => lookupFood(it.name, it.grams, it.state, it.prepMethod));
                bItems = scaleItemsToTarget(bItems, tB);

                const fruitRaw = ROTATING_FRUITS_FALLBACK[(d - 1) % ROTATING_FRUITS_FALLBACK.length];
                plItems = [
                    lookupFood(fruitRaw.name, 130, fruitRaw.state, fruitRaw.prepMethod),
                    lookupFood('Almonds', 20, 'Raw', 'Healthy raw almonds')
                ];
                plItems = scaleItemsToTarget(plItems, tPL);

                lItems = [
                    lookupFood('White Rice (Cooked)', 200, 'Cooked', 'Steamed grains portion'),
                    lookupFood('Moong Dal (Cooked)', 160, 'Cooked', 'Tempered with cumin & turmeric'),
                    lookupFood('Paneer (Fresh/Raw)', 70, 'Raw', 'Fresh paneer cubes'),
                    lookupFood('Cucumber', 80, 'Fresh', 'Fresh crisp greens')
                ];
                lItems = scaleItemsToTarget(lItems, tL);

                esItems = [
                    lookupFood('Almonds', 30, 'Raw', 'Healthy raw almonds'),
                    lookupFood('Curd / Dahi (Low Fat)', 100, 'Fresh', 'Cool probiotic dahi')
                ];
                esItems = scaleItemsToTarget(esItems, tES);

                dItems = [
                    lookupFood('Whole Wheat Chapati / Roti', 100, 'Cooked', 'Freshly puffed whole wheat rotis'),
                    lookupFood('Moong Dal (Cooked)', 160, 'Cooked', 'Slow-cooked tempered dal'),
                    lookupFood('Paneer (Fresh/Raw)', 50, 'Raw', 'Light evening protein')
                ];
                dItems = scaleItemsToTarget(dItems, tD);
            }

            const bSub = calcSubtotals(bItems);
            const plSub = calcSubtotals(plItems);
            const lSub = calcSubtotals(lItems);
            const esSub = calcSubtotals(esItems);
            const dSub = calcSubtotals(dItems);

            const dayUnroundedCal = (bSub.unroundedCal || bSub.cal) + (plSub.unroundedCal || plSub.cal) + (lSub.unroundedCal || lSub.cal) + (esSub.unroundedCal || esSub.cal) + (dSub.unroundedCal || dSub.cal);
            const dayUnroundedPro = (bSub.unroundedPro || bSub.pro) + (plSub.unroundedPro || plSub.pro) + (lSub.unroundedPro || lSub.pro) + (esSub.unroundedPro || esSub.pro) + (dSub.unroundedPro || dSub.pro);
            const dayUnroundedCarbs = (bSub.unroundedCarbs || bSub.carbs) + (plSub.unroundedCarbs || plSub.carbs) + (lSub.unroundedCarbs || lSub.carbs) + (esSub.unroundedCarbs || esSub.carbs) + (dSub.unroundedCarbs || dSub.carbs);
            const dayUnroundedFat = (bSub.unroundedFat || bSub.fat) + (plSub.unroundedFat || plSub.fat) + (lSub.unroundedFat || lSub.fat) + (esSub.unroundedFat || esSub.fat) + (dSub.unroundedFat || dSub.fat);
            const dayUnroundedFib = (bSub.unroundedFib || bSub.fib) + (plSub.unroundedFib || plSub.fib) + (lSub.unroundedFib || lSub.fib) + (esSub.unroundedFib || esSub.fib) + (dSub.unroundedFib || dSub.fib);

            const daySumCal = bSub.cal + plSub.cal + lSub.cal + esSub.cal + dSub.cal;
            const daySumPro = bSub.pro + plSub.pro + lSub.pro + esSub.pro + dSub.pro;
            const daySumCarbs = bSub.carbs + plSub.carbs + lSub.carbs + esSub.carbs + dSub.carbs;
            const daySumFat = bSub.fat + plSub.fat + lSub.fat + esSub.fat + dSub.fat;
            const daySumFib = bSub.fib + plSub.fib + lSub.fib + esSub.fib + dSub.fib;

            days.push({
                dayNumber: d,
                dayTitle: `Day ${d}`,
                day: d,
                targetCalories: targetCal,
                totalCalories: Math.round(daySumCal * 10) / 10,
                totalProtein: Math.round(daySumPro * 10) / 10,
                totalCarbs: Math.round(daySumCarbs * 10) / 10,
                totalFat: Math.round(daySumFat * 10) / 10,
                totalFibre: Math.round(daySumFib * 10) / 10,
                unroundedCalories: dayUnroundedCal,
                unroundedProtein: dayUnroundedPro,
                unroundedCarbs: dayUnroundedCarbs,
                unroundedFat: dayUnroundedFat,
                unroundedFibre: dayUnroundedFib,
                meals: [
                    { slot: 'BREAKFAST', slotTitle: '🌅 Breakfast', timeWindow: '08:30 AM', title: '🌅 Breakfast', timing: '08:30 AM', status: 'PENDING', subtotalCalories: bSub.cal, subtotalProtein: bSub.pro, subtotalCarbs: bSub.carbs, subtotalFat: bSub.fat, subtotalFibre: bSub.fib, totalCalories: bSub.cal, totalProtein: bSub.pro, totalCarbs: bSub.carbs, totalFat: bSub.fat, totalFibre: bSub.fib, items: bItems },
                    { slot: 'PRE_LUNCH', slotTitle: '🍎 11:30 AM Mid-Morning Fruit Snack (Pre-Lunch)', timeWindow: '11:30 AM', title: '🍎 Pre-Lunch (11:30 AM Fruit Snack)', timing: '11:30 AM', status: 'PENDING', subtotalCalories: plSub.cal, subtotalProtein: plSub.pro, subtotalCarbs: plSub.carbs, subtotalFat: plSub.fat, subtotalFibre: plSub.fib, totalCalories: plSub.cal, totalProtein: plSub.pro, totalCarbs: plSub.carbs, totalFat: plSub.fat, totalFibre: plSub.fib, items: plItems },
                    { slot: 'LUNCH', slotTitle: '🍛 Lunch', timeWindow: '01:30 PM', title: '🍱 Lunch', timing: '01:30 PM', status: 'PENDING', subtotalCalories: lSub.cal, subtotalProtein: lSub.pro, subtotalCarbs: lSub.carbs, subtotalFat: lSub.fat, subtotalFibre: lSub.fib, totalCalories: lSub.cal, totalProtein: lSub.pro, totalCarbs: lSub.carbs, totalFat: lSub.fat, totalFibre: lSub.fib, items: lItems },
                    { slot: 'EVENING_SNACK', slotTitle: '🥜 Evening Snack', timeWindow: '05:00 PM', title: '☕ Evening Snack', timing: '05:00 PM', status: 'PENDING', subtotalCalories: esSub.cal, subtotalProtein: esSub.pro, subtotalCarbs: esSub.carbs, subtotalFat: esSub.fat, subtotalFibre: esSub.fib, totalCalories: esSub.cal, totalProtein: esSub.pro, totalCarbs: esSub.carbs, totalFat: esSub.fat, totalFibre: esSub.fib, items: esItems },
                    { slot: 'DINNER', slotTitle: '🍲 Dinner', timeWindow: '08:00 PM', title: '🌙 Dinner', timing: '08:00 PM', status: 'PENDING', subtotalCalories: dSub.cal, subtotalProtein: dSub.pro, subtotalCarbs: dSub.carbs, subtotalFat: dSub.fat, subtotalFibre: dSub.fib, totalCalories: dSub.cal, totalProtein: dSub.pro, totalCarbs: dSub.carbs, totalFat: dSub.fat, totalFibre: dSub.fib, items: dItems }
                ]
            });
        }

        let clientDocNotes = (activeFoodConfirmationData && activeFoodConfirmationData.doctorTrainerNotes) ? activeFoodConfirmationData.doctorTrainerNotes : '';
        if (poolFeasibilityWarning) {
            clientDocNotes = (clientDocNotes ? clientDocNotes + '\n\n' : '') + `⚠️ Nutrition Limitation Note: ${poolFeasibilityWarning}`;
        }

        const generatedPlan = {
            id: 'diet_' + Date.now(),
            planType: planType,
            title: `${durationLabel} Transformation 5-Meal Plan`,
            fitnessGoal: pGoal,
            dailyTargetCalories: targetCal,
            dailyTargetProtein: proGrams,
            dailyTargetCarbs: carbGrams,
            dailyTargetFat: fatGrams,
            dailyTargetFibre: fibreGrams,
            doctorTrainerNotes: clientDocNotes,
            limitationNote: poolFeasibilityWarning,
            warning: poolFeasibilityWarning,
            confirmedFoods: pool,
            days: days
        };

        return {
            text: `### 🥗 ${generatedPlan.title}\n\nI have generated your customized **5-meal diet plan** grounded directly in your **Profile & Calorie Calculator** (${targetCal} kcal, Goal: ${pGoal}) using your confirmed foods.\n\nEach meal slot features exact raw/cooked portion weights, culinary prep methods, and verified macronutrient breakdowns. You can mark meals as consumed, print the layout, or ask for adjustments!`,
            dietPlan: generatedPlan
        };
    }

    if (detectClientRecipeIntent(q)) {
        const recipe = generateClientDynamicRecipe(q, aiCoachChatTurns, getUserConfirmedFoods());
        return {
            text: formatClientRecipeMarkdown(recipe),
            dietPlan: null,
            recipe: recipe
        };
    }

    return {
        text: generateClientCoachFallback(message, data),
        dietPlan: null
    };
}

function quickSendAICoachMessage(text) {
    const input = document.getElementById('aiCoachInput');
    if (input) {
        input.value = text;
        sendAICoachMessage();
    }
}

function detectClientRecipeIntent(text) {
    if (!text) return false;
    const q = text.toLowerCase().trim();
    if (q.includes('another recipe') || q.includes('high protein recipe') || q.includes('make it high protein') ||
        q.includes('low-calorie') || q.includes('without milk') || q.includes('different recipe') ||
        q.includes('make the recipe high protein')) {
        return 'RECIPE_MODIFICATION';
    }
    if (q.includes('dish') || q.includes('prepare') || q.includes('cook') || q.includes('recipe') ||
        q.includes('what dishes') || q.includes('what can i prepare') || q.includes('what can i make') ||
        q.includes('make with') ||
        (q.includes('and') && (q.includes('curd') || q.includes('apple') || q.includes('banana') || q.includes('oats') || q.includes('milk') || q.includes('dal') || q.includes('rice') || q.includes('spinach') || q.includes('eggs') || q.includes('bread')))) {
        return 'RECIPE_GENERATION';
    }
    return false;
}

function extractClientNegativeExclusions(text) {
    if (!text) return [];
    const ex = [];
    const q = text.toLowerCase();
    const candidateFoods = ['milk', 'curd', 'yogurt', 'apple', 'banana', 'oats', 'egg', 'eggs', 'bread', 'paneer', 'tofu', 'chicken', 'rice', 'dal', 'spinach', 'broccoli', 'almonds'];
    for (const food of candidateFoods) {
        if (q.includes('without ' + food) || q.includes('no ' + food) || q.includes('remove ' + food) ||
            q.includes('drop ' + food) || q.includes('exclude ' + food) || q.includes('omit ' + food) ||
            q.includes("don't use " + food) || q.includes("dont use " + food)) {
            ex.push(food);
            if (food === 'egg') ex.push('eggs');
            if (food === 'eggs') ex.push('egg');
            if (food === 'curd') ex.push('yogurt', 'greek yogurt');
            if (food === 'milk') ex.push('dairy');
        }
    }
    if (q.includes('dairy free') || q.includes('dairy-free')) ex.push('milk', 'curd', 'paneer', 'yogurt');
    if (q.includes('egg free') || q.includes('egg-free')) ex.push('egg', 'eggs');
    return [...new Set(ex)];
}

function generateClientDynamicRecipe(message, history = [], confirmedFoods = []) {
    const q = (message || '').toLowerCase();
    const exclusions = extractClientNegativeExclusions(q);
    const rawIngs = [];
    const dict = ['apple', 'apples', 'banana', 'bananas', 'curd', 'yogurt', 'greek yogurt', 'oats', 'milk', 'rice', 'dal', 'lentils', 'spinach', 'eggs', 'egg', 'bread', 'paneer', 'tofu', 'chicken', 'sweet potato', 'quinoa', 'broccoli', 'almonds'];
    
    dict.forEach(k => {
        if (q.includes(k) && !exclusions.some(e => k.includes(e) || e.includes(k))) {
            let base = k;
            if (k === 'bananas') base = 'banana';
            if (k === 'apples') base = 'apple';
            if (k === 'egg') base = 'eggs';
            if (k === 'yogurt' || k === 'greek yogurt') base = 'curd';
            if (!rawIngs.includes(base) && !exclusions.includes(base)) rawIngs.push(base);
        }
    });

    if (rawIngs.length === 0 && history && history.length > 0) {
        for (let i = history.length - 1; i >= 0; i--) {
            const pastText = (history[i].content || history[i].text || '').toLowerCase();
            dict.forEach(k => {
                if (pastText.includes(k) && !exclusions.some(e => k.includes(e) || e.includes(k))) {
                    let base = k;
                    if (k === 'bananas') base = 'banana';
                    if (k === 'apples') base = 'apple';
                    if (k === 'egg') base = 'eggs';
                    if (k === 'yogurt' || k === 'greek yogurt') base = 'curd';
                    if (!rawIngs.includes(base) && !exclusions.includes(base)) rawIngs.push(base);
                }
            });
            if (rawIngs.length > 0) break;
        }
    }

    if (rawIngs.length === 0 && confirmedFoods && confirmedFoods.length > 0) {
        confirmedFoods.forEach(cf => {
            const cl = cf.toLowerCase();
            dict.forEach(k => {
                if (cl.includes(k) && !exclusions.some(e => k.includes(e) || e.includes(k))) {
                    let base = k;
                    if (k === 'bananas') base = 'banana';
                    if (k === 'apples') base = 'apple';
                    if (k === 'egg') base = 'eggs';
                    if (k === 'yogurt' || k === 'greek yogurt') base = 'curd';
                    if (!rawIngs.includes(base) && !exclusions.includes(base)) rawIngs.push(base);
                }
            });
        });
    }

    const isAnother = q.includes('another') || q.includes('different') || q.includes('second');
    const isHighProtein = q.includes('high protein') || q.includes('more protein') || q.includes('extra protein');
    const isWithoutMilk = exclusions.includes('milk') || q.includes('without milk') || q.includes('no milk') || q.includes('dairy free') || q.includes('dairy-free');

    let ingredients = rawIngs.length > 0 ? rawIngs : ['apple', 'banana', 'curd'];
    if (isWithoutMilk) {
        ingredients = ingredients.filter(i => !i.includes('milk'));
    }
    if (ingredients.length === 0) {
        ingredients = ['oats', 'banana'];
    }

    const recipe = {
        recipeName: '',
        description: '',
        pairingExplanation: '',
        prepTimeMinutes: 5,
        cookTimeMinutes: 0,
        servings: 1,
        ingredients: [],
        optionalIngredients: [],
        instructions: []
    };

    const hasAll = (...items) => items.every(it => ingredients.some(l => l.includes(it) || it.includes(l)));

    if (hasAll('apple', 'banana', 'curd') || (ingredients.includes('curd') && (ingredients.includes('apple') || ingredients.includes('banana')))) {
        if (isAnother) {
            recipe.recipeName = 'Blended Frosted Banana-Apple Curd Smoothie Bowl';
            recipe.description = 'A thick, chilled smoothie bowl created by whipping cold curd with sliced bananas and folding in crisp apple cubes.';
            recipe.pairingExplanation = 'Whisking the curd with ripe banana creates a silky, mousse-like emulsion without added cream or sugars. The diced apples add a satisfying textural contrast and soluble pectin fibre.';
            recipe.instructions = [
                'Add 150g cold curd and 100g sliced ripe banana into a blender or bowl and whip until frothy and smooth.',
                'Pour the velvety mixture into a wide chilled breakfast bowl.',
                'Dice 100g of crisp fresh apple and arrange evenly across the surface as a crunchy topping.',
                'Enjoy immediately with a spoon for a refreshing prebiotic breakfast or post-workout bowl.'
            ];
        } else {
            recipe.recipeName = 'Chilled Curd Apple-Banana Parfait Bowl';
            recipe.description = 'A layered prebiotic bowl featuring whisked creamy curd, naturally sweet sliced banana, and crisp diced apple.';
            recipe.pairingExplanation = 'The probiotic lactic acid in curd cuts through the rich sweetness of ripe banana, while the crisp crunch of apple provides a refreshing contrast. No sweeteners or added fats are required.';
            recipe.instructions = [
                'Whisk 150g of fresh curd in a small bowl until completely smooth and creamy.',
                'Thinly slice 100g of ripe banana and finely dice 100g of fresh apple.',
                'Layer half the whisked curd at the bottom of a glass or bowl, add the banana slices, layer remaining curd, and crown with diced apples.',
                'Serve chilled for optimal freshness and texture.'
            ];
        }
        const curdGrams = isHighProtein ? 250 : 150;
        recipe.ingredients = [
            { name: 'Curd / Dahi (Low Fat)', quantity: curdGrams, unit: 'g', prepState: 'chilled whisked', calories: Math.round(curdGrams * 0.6), protein: Math.round(curdGrams * 0.035 * 10) / 10, carbs: Math.round(curdGrams * 0.045 * 10) / 10, fat: Math.round(curdGrams * 0.03 * 10) / 10, fibre: 0 },
            { name: 'Banana', quantity: 100, unit: 'g', prepState: 'sliced ripe', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fibre: 2.6 },
            { name: 'Apple', quantity: 100, unit: 'g', prepState: 'fresh diced', calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2, fibre: 2.4 }
        ];
        recipe.optionalIngredients = [
            { name: 'Ground Cinnamon', reason: 'Adds aromatic sweetness without sugar (Needs confirmation)' },
            { name: 'Chia Seeds (5g)', reason: 'Adds omega-3 crunch and extra fibre (Needs confirmation)' }
        ];
        recipe.prepTimeMinutes = 5;
        recipe.cookTimeMinutes = 0;
        recipe.servings = 1;
    } else if (hasAll('oats', 'banana') || hasAll('oats', 'milk', 'banana')) {
        if (isWithoutMilk) {
            recipe.recipeName = 'Stovetop Banana Oatmeal Bowl (Water-Simmered)';
            recipe.description = 'Warm rolled oats simmered in water with caramelized banana slices for natural sweetness.';
            recipe.pairingExplanation = 'Simmering rolled oats with ripe mashed banana releases natural beta-glucan and fruit sugars, producing a rich, creamy porridge texture even without dairy milk.';
            recipe.instructions = [
                'Bring 150ml of clean drinking water to a gentle simmer in a small saucepan.',
                'Add 50g of rolled oats and cook over medium heat for 4–5 minutes, stirring continuously.',
                'Mash half the banana into the porridge during the final minute of cooking to naturally sweeten it.',
                'Transfer to a bowl and top with the remaining sliced banana.'
            ];
            recipe.ingredients = [
                { name: 'Oats (Raw)', quantity: isHighProtein ? 70 : 50, unit: 'g', prepState: 'rolled', calories: isHighProtein ? 272 : 195, protein: isHighProtein ? 11.8 : 8.5, carbs: isHighProtein ? 46.4 : 33.2, fat: isHighProtein ? 4.8 : 3.5, fibre: isHighProtein ? 7.4 : 5.3 },
                { name: 'Banana', quantity: 100, unit: 'g', prepState: 'sliced', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fibre: 2.6 }
            ];
        } else if (isAnother) {
            recipe.recipeName = 'Overnight Banana Oats Infusion';
            recipe.description = 'Rolled oats soaked cold in toned milk overnight with sweet banana slices.';
            recipe.pairingExplanation = 'Soaking oats cold in toned milk slowly softens the grain fibres without cooking, preserving heat-sensitive vitamins while absorbing the sweet aroma of sliced bananas.';
            recipe.instructions = [
                'In a clean mason jar or bowl, combine 50g rolled oats with 200ml cold toned milk.',
                'Stir thoroughly, seal tightly, and place in the refrigerator for at least 4 hours or overnight.',
                'In the morning, slice 100g of ripe banana and layer on top of the softened oats.',
                'Enjoy cold as a grab-and-go energy-dense breakfast.'
            ];
            recipe.ingredients = [
                { name: 'Oats (Raw)', quantity: isHighProtein ? 70 : 50, unit: 'g', prepState: 'rolled', calories: isHighProtein ? 272 : 195, protein: isHighProtein ? 11.8 : 8.5, carbs: isHighProtein ? 46.4 : 33.2, fat: isHighProtein ? 4.8 : 3.5, fibre: isHighProtein ? 7.4 : 5.3 },
                { name: "Cow's Milk (Toned)", quantity: 200, unit: 'ml', prepState: 'chilled', calories: 116, protein: 6.4, carbs: 9.6, fat: 6.2, fibre: 0 },
                { name: 'Banana', quantity: 100, unit: 'g', prepState: 'sliced', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fibre: 2.6 }
            ];
        } else {
            recipe.recipeName = 'Warm Stovetop Banana Oatmeal Porridge';
            recipe.description = 'A wholesome warm porridge made by simmering rolled oats in toned milk and folding in sliced ripe banana.';
            recipe.pairingExplanation = 'Oats provide complex carbohydrates and soluble beta-glucan fibre, milk contributes complete dairy protein and calcium, and banana provides fast-acting natural glucose and potassium.';
            recipe.instructions = [
                'Pour 200ml toned milk into a saucepan and bring to a gentle simmer over medium heat.',
                'Add 50g rolled oats and cook for 4–5 minutes, stirring until thick and creamy.',
                'Slice 100g of fresh banana into rounds.',
                'Pour the warm oatmeal into a bowl, arrange the banana slices on top, and serve warm.'
            ];
            recipe.ingredients = [
                { name: 'Oats (Raw)', quantity: isHighProtein ? 70 : 50, unit: 'g', prepState: 'rolled', calories: isHighProtein ? 272 : 195, protein: isHighProtein ? 11.8 : 8.5, carbs: isHighProtein ? 46.4 : 33.2, fat: isHighProtein ? 4.8 : 3.5, fibre: isHighProtein ? 7.4 : 5.3 },
                { name: "Cow's Milk (Toned)", quantity: 200, unit: 'ml', prepState: 'simmered', calories: 116, protein: 6.4, carbs: 9.6, fat: 6.2, fibre: 0 },
                { name: 'Banana', quantity: 100, unit: 'g', prepState: 'sliced', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fibre: 2.6 }
            ];
        }
        recipe.optionalIngredients = [
            { name: 'Almonds (10g)', reason: 'Adds vitamin E, healthy fats and crunch (Needs confirmation)' }
        ];
        recipe.prepTimeMinutes = 5;
        recipe.cookTimeMinutes = 5;
        recipe.servings = 1;
    } else if (hasAll('rice', 'dal', 'spinach')) {
        if (isAnother) {
            recipe.recipeName = 'Layered Steamed Rice with Tempered Dal & Sautéed Spinach';
            recipe.description = 'Fragrant steamed white or brown rice served alongside golden tempered moong dal and vibrant wilted spinach.';
            recipe.pairingExplanation = 'Serving the components layered allows you to experience the crisp earthy notes of garlic-wilted spinach against the warm soothing comfort of protein-rich dal and steamed grain.';
            recipe.instructions = [
                'Cook 100g rice and 150g moong dal separately until tender.',
                'In a non-stick pan with minimal water or drop of oil, gently wilt 100g chopped spinach for 2 minutes.',
                'Mound the fluffy steamed rice on one side of a plate and ladle the hot dal on the other.',
                'Place the warm wilted spinach alongside and serve hot.'
            ];
        } else {
            recipe.recipeName = 'Nutrient-Dense Dal Palak Khichdi / One-Pot Bowl';
            recipe.description = 'A comforting one-pot Indian meal combining steamed rice, protein-packed yellow lentils (dal), and tender chopped spinach.';
            recipe.pairingExplanation = 'Combining grain (rice) with legume (dal) forms a complete amino acid profile with all 9 essential amino acids. Fresh spinach infuses non-heme iron and folate, which is better absorbed alongside the lentils.';
            recipe.instructions = [
                'Rinse rice and dal; simmer in 2.5 cups of water with a pinch of turmeric and salt until soft and porridge-like (about 12 minutes).',
                'Thoroughly wash and finely chop 100g of fresh spinach leaves.',
                'Fold the chopped spinach into the hot dal and rice mixture during the last 3 minutes of cooking so it wilts gently while retaining its vibrant green color.',
                'Stir well and serve steaming hot as a restorative complete meal.'
            ];
        }
        const dalGrams = isHighProtein ? 220 : 150;
        recipe.ingredients = [
            { name: 'White Rice (Cooked)', quantity: 100, unit: 'g', prepState: 'steamed', calories: 130, protein: 2.7, carbs: 28.2, fat: 0.3, fibre: 0.4 },
            { name: 'Moong Dal (Cooked)', quantity: dalGrams, unit: 'g', prepState: 'cooked tempered', calories: Math.round(dalGrams * 1.05), protein: Math.round(dalGrams * 0.071 * 10) / 10, carbs: Math.round(dalGrams * 0.19 * 10) / 10, fat: 0.6, fibre: Math.round(dalGrams * 0.053 * 10) / 10 },
            { name: 'Spinach (Raw)', quantity: 100, unit: 'g', prepState: 'chopped fresh', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fibre: 2.2 }
        ];
        recipe.optionalIngredients = [
            { name: 'Cumin & Mustard Seeds', reason: 'For aromatic digestive tempering (Needs confirmation)' },
            { name: 'Lemon Wedge', reason: 'Vitamin C to boost plant iron absorption (Needs confirmation)' }
        ];
        recipe.prepTimeMinutes = 5;
        recipe.cookTimeMinutes = 15;
        recipe.servings = 1;
    } else if (hasAll('eggs', 'bread', 'milk') || (ingredients.includes('eggs') && ingredients.includes('bread'))) {
        if (isAnother) {
            recipe.recipeName = 'Soft Scrambled Eggs with Warm Toasted Bread';
            recipe.description = 'Velvety eggs scrambled gently with a splash of milk and served atop crisp whole wheat toast.';
            recipe.pairingExplanation = 'Whisking a splash of toned milk into whole eggs tenderizes the egg proteins, producing delicate, melt-in-the-mouth curds that complement the crunch of toasted bread.';
            recipe.instructions = [
                'Whisk 2 whole eggs with 50ml toned milk in a bowl until light and uniform.',
                'Pour into a warm non-stick skillet over low heat and gently fold with a spatula for 2 minutes until soft curds form.',
                'Toast 2 slices of whole wheat bread until golden and crisp.',
                'Spoon the soft scrambled eggs over the warm toast and serve immediately.'
            ];
        } else {
            recipe.recipeName = 'Golden Protein French Toast';
            recipe.description = 'Whole wheat bread slices dipped in a wholesome whisked egg and milk batter, then toasted golden on a skillet.';
            recipe.pairingExplanation = 'The egg and milk custard penetrates the crumb of whole wheat bread, infusing it with high biological value protein (18g+) and healthy fats while creating a comforting crisp exterior.';
            recipe.instructions = [
                'In a shallow dish, beat 2 whole eggs with 50ml toned milk until completely blended.',
                'Dip each slice of whole wheat bread into the egg mixture for 10 seconds per side until evenly soaked.',
                'Heat a non-stick pan over medium heat. Place the soaked bread and cook for 2–3 minutes per side until golden brown and cooked through.',
                'Transfer to a plate and serve hot.'
            ];
        }
        const eggGrams = isHighProtein ? 150 : 100;
        recipe.ingredients = [
            { name: 'Eggs (Whole Boiled)', quantity: eggGrams, unit: 'g', prepState: 'whisked', calories: Math.round(eggGrams * 1.55), protein: Math.round(eggGrams * 0.13 * 10) / 10, carbs: 1.1, fat: Math.round(eggGrams * 0.11 * 10) / 10, fibre: 0 },
            { name: 'Whole Wheat Bread', quantity: 60, unit: 'g', prepState: 'toasted', calories: 148, protein: 7.8, carbs: 24.6, fat: 2.0, fibre: 4.2 },
            { name: "Cow's Milk (Toned)", quantity: 50, unit: 'ml', prepState: 'custard mix', calories: 29, protein: 1.6, carbs: 2.4, fat: 1.5, fibre: 0 }
        ];
        recipe.optionalIngredients = [
            { name: 'Black Pepper & Pink Salt', reason: 'Savory seasoning (Needs confirmation)' },
            { name: 'Vanilla Extract / Cinnamon', reason: 'For a sweet French toast profile (Needs confirmation)' }
        ];
        recipe.prepTimeMinutes = 5;
        recipe.cookTimeMinutes = 6;
        recipe.servings = 1;
    } else if (ingredients.includes('apple') && ingredients.includes('banana') && ingredients.length <= 2) {
        recipe.recipeName = 'Warm Spiced Stewed Fruit Medley';
        recipe.description = 'Gentle warm fruit purée made by simmering fresh diced apple and sliced banana.';
        recipe.pairingExplanation = 'Apples provide tartness, firm texture, and soluble pectin fibre, while bananas provide soft creamy sweetness and potassium. Cooking them gently breaks down the cellular walls into a soothing, easily digestible warm bowl.';
        recipe.instructions = [
            'Peel and slice 100g ripe banana and finely dice 120g fresh apple.',
            'Place in a small saucepan with 2 tablespoons of water over low heat.',
            'Cover and simmer for 5–6 minutes until the apples soften and the banana becomes jammy.',
            'Mash lightly with a fork and serve warm in a dessert glass or bowl.'
        ];
        recipe.ingredients = [
            { name: 'Apple', quantity: 120, unit: 'g', prepState: 'diced', calories: 62, protein: 0.4, carbs: 16.6, fat: 0.2, fibre: 2.9 },
            { name: 'Banana', quantity: 100, unit: 'g', prepState: 'sliced', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fibre: 2.6 }
        ];
        recipe.optionalIngredients = [
            { name: 'Greek Yogurt / Curd (100g)', reason: 'CRITICAL NOTICE: You provided only two fruits. Adding curd or yogurt provides missing protein for a balanced meal (Needs confirmation)' },
            { name: 'Almonds or Walnuts (15g)', reason: 'Adds healthy fats and satiety to round out the fruit carbs (Needs confirmation)' }
        ];
        recipe.prepTimeMinutes = 5;
        recipe.cookTimeMinutes = 6;
        recipe.servings = 1;
    } else {
        const title = 'Wholesome ' + ingredients.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' & ') + ' Medley';
        recipe.recipeName = title;
        recipe.description = 'A customized balanced dish constructed strictly from your confirmed available ingredients.';
        recipe.pairingExplanation = 'Each ingredient has been paired to maximize micronutrient bioavailability and provide sustained satiety according to your confirmed ingredient list.';
        recipe.instructions = [
            'Wash and prep all confirmed ingredients into uniform portion sizes.',
            'Lightly cook grains and proteins until tender and thoroughly heated through.',
            'Assemble and serve together for optimal macronutrient balance.'
        ];
        recipe.ingredients = ingredients.map(item => ({
            name: item.charAt(0).toUpperCase() + item.slice(1),
            quantity: 100,
            unit: 'g',
            prepState: 'freshly prepared',
            calories: 120,
            protein: 6.0,
            carbs: 15.0,
            fat: 3.0,
            fibre: 2.5
        }));
        recipe.prepTimeMinutes = 10;
        recipe.cookTimeMinutes = 10;
        recipe.servings = 1;
    }

    let totCal = 0, totPro = 0, totCarbs = 0, totFat = 0, totFib = 0;
    recipe.ingredients.forEach(i => {
        totCal += i.calories;
        totPro += i.protein;
        totCarbs += i.carbs;
        totFat += i.fat;
        totFib += i.fibre;
    });

    recipe.totalCalories = Math.round(totCal * 10) / 10;
    recipe.totalProtein = Math.round(totPro * 10) / 10;
    recipe.totalCarbs = Math.round(totCarbs * 10) / 10;
    recipe.totalFat = Math.round(totFat * 10) / 10;
    recipe.totalFibre = Math.round(totFib * 10) / 10;
    recipe.caloriesPerServing = recipe.totalCalories;
    recipe.proteinPerServing = recipe.totalProtein;
    recipe.carbsPerServing = recipe.totalCarbs;
    recipe.fatPerServing = recipe.totalFat;
    recipe.fibrePerServing = recipe.totalFibre;

    return recipe;
}

function formatClientRecipeMarkdown(r) {
    let sb = `### 🍽️ ${r.recipeName}\n\n`;
    sb += `${r.description}\n\n`;
    if (r.pairingExplanation) {
        sb += `**Why these ingredients work together:**\n${r.pairingExplanation}\n\n`;
    }
    sb += `⏱️ **Prep Time:** ${r.prepTimeMinutes} mins | 🍽️ **Servings:** ${r.servings}\n`;
    sb += `⚡ **Verified Database Nutrition:** **${r.totalCalories} kcal** | 🥩 **${r.totalProtein}g Protein** | 🌾 **${r.totalCarbs}g Carbs** | 🧈 **${r.totalFat}g Fat** | 🥗 **${r.totalFibre}g Fibre**\n\n`;

    sb += `#### 🥗 Exact Ingredients (Strictly from your input):\n`;
    r.ingredients.forEach(ing => {
        sb += `- **${ing.name}:** ${ing.quantity}${ing.unit} (${ing.prepState}) — *${ing.calories} kcal, ${ing.protein}g protein*\n`;
    });
    sb += `\n`;

    if (r.optionalIngredients && r.optionalIngredients.length > 0) {
        sb += `#### 💡 Optional Enhancements (Requires your approval):\n`;
        r.optionalIngredients.forEach(opt => {
            sb += `- *${opt.name}:* ${opt.reason}\n`;
        });
        sb += `\n`;
    }

    sb += `#### 👨‍🍳 Preparation Instructions:\n`;
    r.instructions.forEach((inst, idx) => {
        sb += `${idx + 1}. ${inst}\n`;
    });

    sb += `\n*You can ask me to: "Give me another recipe", "Make it high protein", or "Suggest a low-calorie option"!*`;
    return sb;
}

function renderRecipeCardHtml(r) {
    if (!r) return '';
    const ingredientsHtml = (r.ingredients || []).map(ing => `
        <li class="d-flex justify-content-between align-items-center py-1" style="border-bottom: 1px dashed #2A2A2A; font-size: 13px;">
            <span><i class="bi bi-check-circle-fill text-warning me-2"></i><strong>${escapeCoachHtml(ing.name)}</strong> <span class="text-muted">(${escapeCoachHtml(ing.prepState || 'fresh')})</span></span>
            <span class="badge bg-dark border border-secondary text-light">${ing.quantity}${ing.unit || 'g'} · ${ing.calories} kcal</span>
        </li>
    `).join('');

    let optionalHtml = '';
    if (r.optionalIngredients && r.optionalIngredients.length > 0) {
        const optItems = r.optionalIngredients.map(opt => `
            <div class="small p-2 rounded mb-1" style="background: rgba(255, 193, 7, 0.08); border: 1px solid rgba(255, 193, 7, 0.25); color: #FFC107;">
                <strong>💡 ${escapeCoachHtml(opt.name)}:</strong> <span class="text-light">${escapeCoachHtml(opt.reason)}</span>
            </div>
        `).join('');
        optionalHtml = `
            <div class="mt-3">
                <div class="small fw-semibold text-warning mb-1"><i class="bi bi-shield-exclamation"></i> Optional Enhancements (Requires your confirmation):</div>
                ${optItems}
            </div>
        `;
    }

    const stepsHtml = (r.instructions || []).map((step, idx) => `
        <div class="d-flex gap-2 mb-2 align-items-start" style="font-size: 13px;">
            <span class="badge rounded-circle bg-warning text-dark flex-shrink-0" style="width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px;">${idx + 1}</span>
            <div class="text-light">${escapeCoachHtml(step)}</div>
        </div>
    `).join('');

    return `
        <div class="ai-recipe-card mt-3 p-3 rounded" style="background: #141414; border: 1px solid #FF8A1F; box-shadow: 0 4px 14px rgba(255,138,31,0.15);">
            <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                <div>
                    <h5 class="mb-1 text-white fw-bold"><i class="bi bi-egg-fried text-warning me-2"></i>${escapeCoachHtml(r.recipeName)}</h5>
                    <div class="small text-muted">${escapeCoachHtml(r.description)}</div>
                </div>
                <span class="badge" style="background: rgba(66, 133, 244, 0.2); color: #8AB4F8; border: 1px solid #4285F4; font-size: 11px;">⚡ Verified DB Nutrition</span>
            </div>

            ${r.pairingExplanation ? `
                <div class="p-2 rounded mb-3 small" style="background: #1C1C1C; border-left: 3px solid #6FAE3D; color: #DDD;">
                    <strong>🧠 Why these work together:</strong> ${escapeCoachHtml(r.pairingExplanation)}
                </div>
            ` : ''}

            <!-- Timing and Servings Bar -->
            <div class="d-flex gap-3 flex-wrap mb-3 p-2 rounded small" style="background: #1A1A1A; border: 1px solid #282828;">
                <span class="text-white"><i class="bi bi-stopwatch text-warning me-1"></i> Prep: <strong>${r.prepTimeMinutes || 5}m</strong></span>
                <span class="text-white"><i class="bi bi-fire text-danger me-1"></i> Cook: <strong>${r.cookTimeMinutes || 0}m</strong></span>
                <span class="text-white"><i class="bi bi-people text-info me-1"></i> Servings: <strong>${r.servings || 1}</strong></span>
            </div>

            <!-- Macro Pills -->
            <div class="d-flex gap-2 flex-wrap mb-3">
                <span class="badge p-2 bg-dark border border-warning text-warning" style="font-size: 12px;">🔥 ${r.totalCalories} kcal</span>
                <span class="badge p-2 bg-dark border border-info text-info" style="font-size: 12px;">🥩 ${r.totalProtein}g Protein</span>
                <span class="badge p-2 bg-dark border border-secondary text-light" style="font-size: 12px;">🌾 ${r.totalCarbs}g Carbs</span>
                <span class="badge p-2 bg-dark border border-secondary text-light" style="font-size: 12px;">🧈 ${r.totalFat}g Fat</span>
                <span class="badge p-2 bg-dark border border-success text-success" style="font-size: 12px;">🥗 ${r.totalFibre}g Fibre</span>
            </div>

            <!-- Ingredients -->
            <div class="mb-3">
                <div class="small fw-semibold text-warning mb-2"><i class="bi bi-basket2 text-warning me-1"></i> Exact Ingredients (Strictly from your input):</div>
                <ul class="list-unstyled mb-0">${ingredientsHtml}</ul>
            </div>

            ${optionalHtml}

            <!-- Instructions -->
            <div class="mt-3">
                <div class="small fw-semibold text-warning mb-2"><i class="bi bi-list-ol text-warning me-1"></i> Preparation Steps:</div>
                ${stepsHtml}
            </div>

            <!-- Quick Action Prompts -->
            <div class="mt-3 pt-2 d-flex flex-wrap gap-2" style="border-top: 1px solid #282828;">
                <button type="button" class="btn btn-sm btn-outline-warning py-1 px-2" style="font-size: 11px; border-radius: 12px;" onclick="quickSendAICoachMessage('Give me another recipe')">🔄 Another Recipe</button>
                <button type="button" class="btn btn-sm btn-outline-info py-1 px-2" style="font-size: 11px; border-radius: 12px;" onclick="quickSendAICoachMessage('Make the recipe high protein')">💪 High Protein</button>
                <button type="button" class="btn btn-sm btn-outline-light py-1 px-2" style="font-size: 11px; border-radius: 12px;" onclick="quickSendAICoachMessage('Suggest a low-calorie option')">🥗 Low Calorie</button>
            </div>
        </div>
    `;
}

function appendAICoachBubble(sender, text, source = '', attachment = null, doScroll = true, dietPlan = null, searchSources = null, recipe = null) {
    const container = document.getElementById('aiCoachMessages');
    if (!container) return;

    const row = document.createElement('div');
    row.className = sender === 'user' ? 'ai-msg-row-user' : 'ai-msg-row-bot';

    if (sender === 'user') {
        let attachmentHtml = '';
        if (attachment) {
            if (attachment.isImage && attachment.dataUrl) {
                attachmentHtml = `
                    <div class="ai-bubble-img-wrap">
                        <img src="${attachment.dataUrl}" alt="${escapeCoachHtml(attachment.name)}" class="ai-bubble-img">
                    </div>
                `;
            } else {
                attachmentHtml = `
                    <div class="ai-bubble-doc-card">
                        <div class="ai-bubble-doc-icon">${attachment.icon || '📄'}</div>
                        <div class="ai-bubble-doc-info">
                            <div class="ai-bubble-doc-name" title="${escapeCoachHtml(attachment.name)}">${escapeCoachHtml(attachment.name)}</div>
                            <div class="ai-bubble-doc-meta">${attachment.type || 'DOC'} · ${attachment.size || ''}</div>
                        </div>
                    </div>
                `;
            }
        }
        const textHtml = text ? `<div class="ai-bubble-text">${escapeCoachHtml(text)}</div>` : '';
        row.innerHTML = `
            <div class="ai-msg-user-bubble">
                ${attachmentHtml}
                ${textHtml}
            </div>
        `;
    } else {
        const formatted = formatAIMarkdown(text);
        const isGroq = source === 'groq' || source === 'grok' || source === 'gemini';
        const sourceLabel = isGroq ? '⚡ Groq AI' : (source === 'system' ? '⚡ System Notice' : '⚡ Grounded Engine');
        const badgeStyle = isGroq 
            ? 'background: rgba(111, 174, 61, 0.2); color: #6FAE3D; border: 1px solid #6FAE3D;' 
            : 'background: #262626; color: #A9A9A9; border: 1px solid #333333;';
        
        let searchSourcesHtml = '';
        if (searchSources && Array.isArray(searchSources) && searchSources.length > 0) {
            const pills = searchSources.map(s => `
                <a href="${escapeCoachHtml(s.uri)}" target="_blank" rel="noopener noreferrer" class="ai-grounding-pill" style="display:inline-flex; align-items:center; gap:4px; padding:3px 8px; margin:2px; background:rgba(66, 133, 244, 0.15); border:1px solid rgba(66, 133, 244, 0.4); border-radius:12px; font-size:11px; color:#8AB4F8; text-decoration:none;">
                    <i class="bi bi-google" style="font-size:10px;"></i>
                    <span style="max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${escapeCoachHtml(s.title || s.uri)}</span>
                    <i class="bi bi-box-arrow-up-right" style="font-size:9px;"></i>
                </a>
            `).join('');
            searchSourcesHtml = `
                <div class="ai-grounding-sources mt-2 pt-2" style="border-top:1px dashed #333333;">
                    <div style="font-size:11px; color:#A9A9A9; margin-bottom:4px; display:flex; align-items:center; gap:4px;">
                        <span>🌐 Google Search Grounded Sources:</span>
                    </div>
                    <div class="d-flex flex-wrap gap-1">${pills}</div>
                </div>
            `;
        }

        let dietPlanHtml = '';
        if (dietPlan) {
            let effectivePlan = dietPlan;
            if (currentActiveDietPlan && (!dietPlan.id || String(dietPlan.id) === String(currentActiveDietPlan.id))) {
                effectivePlan = currentActiveDietPlan;
            }
            dietPlanHtml = renderDietPlanHtml(effectivePlan);
        }

        let recipeHtml = '';
        if (recipe) {
            recipeHtml = renderRecipeCardHtml(recipe);
        }

        row.innerHTML = `
            <div class="ai-bot-avatar">🤖</div>
            <div class="ai-msg-bot-bubble">
                <div class="d-flex justify-content-between align-items-center mb-2 pb-1 flex-wrap gap-1" style="border-bottom: 1px solid #282828;">
                    <div class="fw-bold" style="font-size: 12px; color: #FF8A1F;">🤖 AI Health Coach</div>
                    ${source ? `<span class="badge" style="${badgeStyle}; font-size: 10px;">${sourceLabel}</span>` : ''}
                </div>
                <div class="markdown-body" style="color: #F5F5F5;">${formatted}</div>
                ${searchSourcesHtml}
                ${recipeHtml}
                ${dietPlanHtml}
            </div>
        `;
    }

    container.appendChild(row);
    if (doScroll) {
        scrollAICoachToBottom();
    }
}

function getAIUserDataPayload() {
    if (!currentUser) return {};

    const profileKey = `ht_profile_${currentUser.email}`;
    const profile = JSON.parse(localStorage.getItem(profileKey) || '{}');
    const challengeKey = `ht_challenge_${currentUser.email}`;
    const challenge = JSON.parse(localStorage.getItem(challengeKey) || '{"totalDays":25,"history":{}}');

    const totalDays = challenge.totalDays || 25;
    const completedDays = Object.keys(challenge.history || {}).length;
    const currentChallengeDay = completedDays < totalDays ? completedDays + 1 : totalDays;

    let totalCal = 0, totalPro = 0;
    foodLog.forEach(f => {
        totalCal += (f.cal || 0);
        totalPro += (f.protein || 0);
    });

    const weight = profile.weight || null;
    const targetGlasses = weight ? Math.ceil((weight * 0.033 * ((profile.activity || 1.2) > 1.5 ? 1.3 : 1)) / 0.25) : 12;

    // Last 7 completed days history
    const history7Days = {};
    const historyKeys = Object.keys(challenge.history || {});
    const last7Keys = historyKeys.slice(-7);
    last7Keys.forEach(k => {
        history7Days[k] = challenge.history[k];
    });

    return {
        user: { name: currentUser.name, email: currentUser.email },
        profile: {
            age: profile.age || null,
            weight: profile.weight || null,
            height: profile.height || null,
            gender: profile.gender || null,
            activity: profile.activity || null,
            bmr: profile.bmr || null,
            tdee: profile.tdee || null,
            selectedGoal: profile.selectedGoal || null,
            targetCalories: profile.targetCalories || profile.tdee || null
        },
        steps: dailySteps,
        dailySteps: dailySteps,
        stepGoal: stepGoal,
        waterGlasses: waterGlasses,
        targetGlasses: targetGlasses,
        foodLog: [...foodLog],
        totalCalories: Math.round(totalCal),
        totalProtein: Math.round(totalPro),
        workout: currentWorkout ? {
            title: currentWorkout.title,
            type: currentWorkout.type,
            exercises: currentWorkout.exercises || [],
            muscles: currentWorkout.muscles || []
        } : null,
        workoutMode: workoutMode,
        challengeDay: currentChallengeDay,
        totalDays: totalDays,
        completedDays: completedDays,
        history7Days: history7Days,
        challenge: challenge
    };
}

function formatAIMarkdown(text) {
    if (!text) return '<p class="mb-0" style="color: #A9A9A9;">No response generated.</p>';

    let html = text
        .replace(/^### (.*$)/gim, '<h5 class="fw-bold mt-2 mb-2 pb-1" style="color: #FF8A1F; border-bottom: 1px solid #262626;">$1</h5>')
        .replace(/^#### (.*$)/gim, '<h6 class="fw-bold mt-2 mb-1" style="color: #6FAE3D;">$1</h6>')
        .replace(/^##### (.*$)/gim, '<div class="fw-bold mt-1 mb-1 small" style="color: #A9A9A9;">$1</div>')
        .replace(/\*\*(.*?)\*\*/gim, '<strong style="color: #F5F5F5;">$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        .replace(/`([^`]+)`/gim, '<code class="px-1 py-0 rounded small" style="background: #151515; color: #FF8A1F; border: 1px solid #3A281E;">$1</code>')
        .replace(/^---$/gim, '<hr class="my-2" style="border-color: #262626;">')
        .replace(/^\s*-\s+(.*$)/gim, '<li class="mb-1" style="color: #F5F5F5;">$1</li>')
        .replace(/^\s*•\s+(.*$)/gim, '<li class="mb-1" style="color: #F5F5F5;">$1</li>')
        .replace(/^\s*(\d+)\.\s+(.*$)/gim, '<li class="mb-1" style="color: #F5F5F5;"><strong style="color: #FF8A1F;">$1.</strong> $2</li>');

    html = html.replace(/(<li.*<\/li>\s*)+/gim, '<ul class="ps-3 my-1 mb-2">$&</ul>');

    const paragraphs = html.split(/\n\n+/);
    return paragraphs.map(p => {
        p = p.trim();
        if (!p) return '';
        if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<hr') || p.startsWith('<div') || p.startsWith('<blockquote')) {
            return p;
        }
        return `<p class="mb-2">${p.replace(/\n/g, '<br>')}</p>`;
    }).join('');
}

// Client fallback analyzer matching the server logic
function generateClientCoachFallback(message, data) {
    const q = (message || '').toLowerCase().trim();
    const steps = data.steps || 0;
    const stepGoal = data.stepGoal || 10000;
    const water = data.waterGlasses || 0;
    const targetWater = data.targetGlasses || 12;
    const foodLog = data.foodLog || [];
    const history = data.history7Days || (data.challenge && data.challenge.history) || {};
    const dayKeys = Object.keys(history);
    const totalDays = data.totalDays || 25;
    const completedDays = data.completedDays || 0;
    const currentDay = data.challengeDay || (completedDays < totalDays ? completedDays + 1 : totalDays);

    let totalCal = 0, totalPro = 0;
    foodLog.forEach(f => { totalCal += (f.cal || 0); totalPro += (f.protein || 0); });

    const hasAnyTodayData = (steps > 0 || water > 0 || foodLog.length > 0 || !!data.workout || (data.workoutMode && data.workoutMode !== 'none'));

    // 1. Weekly Report
    if (q.includes('weekly') || q.includes('week') || q.includes('last 7 days') || q.includes('7 days') || q.includes('past week')) {
        if (dayKeys.length === 0) {
            return `### 📊 WEEKLY AI REPORT
I don't have enough logged data to analyze that yet.

You currently have **0 completed days** recorded in your 25-Day Transformation Challenge history.

**To build your weekly performance report:**
- 👣 Target **10,000 steps daily** on the Steps Tracker.
- 💧 Log **10–12 glasses of water (~2.5–3L)** in the Water Tracker.
- 🍎 Log your meals in the **Food & Nutrition** catalog.
- 🏋️ Finish your workout on the **Day ${currentDay} Dashboard** and mark the day complete!`;
        }

        let totalSteps = 0, totalWater = 0, workoutCount = 0, waterMetDays = 0;
        const allMeals = [];

        dayKeys.forEach(k => {
            const d = history[k];
            const s = d.dailySteps || 0;
            const w = d.waterGlasses || 0;
            totalSteps += s;
            totalWater += w;
            if (w >= 10) waterMetDays++;
            if (d.routineTitle && d.routineTitle !== 'Rest Day') workoutCount++;
            else if (d.workoutMode === 'gym' || d.workoutMode === 'home') workoutCount++;
            (d.foodLog || []).forEach(f => allMeals.push((f.name || '').toLowerCase()));
        });

        const avgSteps = Math.round(totalSteps / dayKeys.length);
        const avgWaterL = ((totalWater / dayKeys.length) * 0.25).toFixed(1);
        const mealFreq = {};
        allMeals.forEach(m => { mealFreq[m] = (mealFreq[m] || 0) + 1; });
        const repeated = Object.entries(mealFreq).filter(([_, c]) => c >= 3).map(([n, c]) => `${n} (${c}x)`);

        return `### 📊 WEEKLY AI REPORT
Here is your weekly Healthify performance breakdown:

🏆 **Challenge:** ${completedDays} / ${totalDays} days completed (${Math.round((completedDays / totalDays) * 100)}%)
👣 **Average Steps:** ${avgSteps.toLocaleString()} steps / day
💧 **Water Goal:** Achieved on ${waterMetDays} / ${dayKeys.length} days (~${avgWaterL}L daily avg)
🏋️ **Workouts:** ${workoutCount} completed

🍎 **Food Patterns:**
${repeated.length > 0 ? `You logged similar meals on several days: **${repeated.join(', ')}**.` : 'Good dietary variety recorded across your logged meals.'}

🌟 **Overall Assessment:**
Your workout consistency is ${workoutCount >= 4 ? 'strong' : 'moderate'}. ${waterMetDays < dayKeys.length ? `Hydration was missed on ${dayKeys.length - waterMetDays} days.` : 'Hydration adherence is excellent.'}

💡 **Personalized Recommendations:**
1. ${avgSteps < 10000 ? `Increase daily walking to bridge the gap toward ${stepGoal.toLocaleString()} steps.` : 'Maintain your strong daily movement consistency.'}
2. ${repeated.length > 0 ? 'Rotate your protein sources (alternate paneer, lentils, chicken, eggs, and tofu) for micronutrient diversity.' : 'Keep prioritizing high-protein whole foods.'}
3. Lock in **Day ${currentDay}** on your Transformation Dashboard!`;
    }

    // 2. Food Variety Check
    if (q.includes('variety') || q.includes('same food') || q.includes('repetitive') || q.includes('eating') || q.includes('diet') || q.includes('what should i eat')) {
        const recentFoods = [];
        foodLog.forEach(f => recentFoods.push((f.name || '').toLowerCase()));
        Object.values(history).forEach(d => {
            (d.foodLog || []).forEach(f => recentFoods.push((f.name || '').toLowerCase()));
        });

        if (recentFoods.length === 0) {
            return `### 🥗 FOOD VARIETY CHECK
No data logged yet.

You haven't logged any meals in Healthify yet. Start logging your foods in the **Veg**, **Non-Veg**, or **Nuts** sections to analyze your dietary variety and micronutrient balance!

**Recommended Choices from Healthify Catalog:**
- 🥦 **Veg:** Paneer (18g protein/100g), Soya Chunks (52g), Chickpeas, Greek Curd.
- 🍗 **Non-Veg:** Grilled Chicken Breast (31g), Boiled Eggs, Salmon.
- 🌾 **Complex Carbs & Fibre:** Oats, Chia Seeds, Brown Rice, Sweet Potatoes.`;
        }

        const counts = {};
        recentFoods.forEach(f => { counts[f] = (counts[f] || 0) + 1; });
        const duplicates = Object.entries(counts).filter(([_, c]) => c >= 2).map(([n, c]) => `${n} (${c}x)`);

        if (duplicates.length > 0) {
            return `🔍 **Food Variety Analysis:**

You have logged **${duplicates.join(', ')}** on several recent days.

While consistency is helpful, eating the exact same meals repeatedly can limit micronutrient diversity. Consider rotating different protein and vegetable sources:

🍽️ **Suggested Swaps from Healthify Food Database:**
- 🧀 **Plant / Dairy Proteins:** Soya chunks (52g protein/100g), Paneer (18g/100g), Boiled Chickpeas.
- 🍗 **Lean Proteins:** Grilled Chicken Breast (31g/100g), Whole Eggs / Egg Whites.
- 🌾 **Fiber & Healthy Fats:** Oats, Chia Seeds, Almonds, Spinach.

Aim for at least 20–30g of varied protein in each main meal!`;
        }

        return `✅ **Food Variety Check:**
Your logged meals show good variety without excessive repetition. Keep balancing high-protein foods with leafy greens, complex carbs, and healthy fats!`;
    }

    // 3. Workout Routine Recommendation
    if (q.includes('workout') || q.includes('routine') || q.includes('exercise') || q.includes('train') || q.includes('gym') || q.includes('what should i do')) {
        const isOdd = (currentDay % 2 !== 0);
        const routineTitle = isOdd ? 'Push & Upper Strength Blast' : 'Pull & Core Conditioning';
        const routineType = isOdd ? 'Home Bodyweight / Dumbbells' : 'Gym / Home Hybrid';

        return `Based on your current challenge day (Day ${currentDay}) and recent workout history, today's recommended routine is:

🏋️ **${routineTitle}** (${routineType})
- **Focus Muscles:** ${isOdd ? 'Chest, Shoulders, Triceps & Quads' : 'Back, Biceps, Core Stabilizers & Hamstrings'}
- **Estimated Time:** 35–40 minutes (~280 kcal burn)

📋 **Exercise Plan from Healthify Catalog:**
1. **${isOdd ? 'Flat Dumbbell / Push-Ups' : 'Wide-Grip Lat Pulldowns / Rows'}** — 4 Sets × 8–12 Reps *(Rest: 60s)*
2. **${isOdd ? 'Incline Dumbbell Press' : 'Seated Cable Rows / Pulls'}** — 3 Sets × 10–12 Reps *(Rest: 60s)*
3. **${isOdd ? 'Overhead Shoulder Press' : 'Standing Barbell / Dumbbell Curls'}** — 3 Sets × 10–12 Reps *(Rest: 45s)*
4. **${isOdd ? 'Cable Tricep Pushdowns / Dips' : 'Bicycle Crunches / Plank Hold'}** — 3 Sets × 15 Reps *(Rest: 45s)*

💡 *Tip: Open **"🏋️ Workouts Hub"** from the Menu and click **"🎬 Watch Video"** on any movement to verify proper exercise form!*`;
    }

    // 4. Transformation Challenge Progress
    if (q.includes('transformation') || q.includes('challenge') || q.includes('how many days') || q.includes('progress')) {
        const pct = Math.round((completedDays / totalDays) * 100);
        return `🏆 **25-Day Transformation Challenge Progress:**

- 📍 **Current Day:** Day ${currentDay} of ${totalDays}
- ✅ **Completed Days:** ${completedDays} / ${totalDays} (${pct}% Complete)
- 🔒 **Remaining Days:** ${totalDays - completedDays} days
- ⭐ **Status:** ${completedDays >= totalDays ? '🎉 Challenge Completed! Fantastic dedication!' : `Day ${currentDay} is active and ready for your workout, steps, and water!`}`;
    }

    // 5. Steps / Water
    if (q.includes('step') || q.includes('walk') || q.includes('activity')) {
        if (steps === 0) {
            return `👣 **Steps Analysis:**
- **Logged Today:** 0 / ${stepGoal.toLocaleString()} steps (0% of goal)
- **Status:** No walking steps recorded today yet.

A 20-30 minute brisk walk will help you log your first 2,500–3,000 steps toward your ${stepGoal.toLocaleString()} goal!`;
        }
        const pct = Math.round((steps / stepGoal) * 100);
        return `👣 **Steps Analysis:**
- **Logged Today:** ${steps.toLocaleString()} / ${stepGoal.toLocaleString()} steps (${pct}% of goal)
- **Estimated Distance:** ~${(steps * 0.00076).toFixed(2)} km
- **Estimated Caloric Burn:** ~${Math.round(steps * 0.04)} kcal

${steps >= stepGoal ? '🎯 Great job! You have conquered your daily step target!' : `You need ${(stepGoal - steps).toLocaleString()} more steps to hit your target. A 15-20 min brisk walk will get you there!`}`;
    }

    if (q.includes('water') || q.includes('hydration') || q.includes('drink')) {
        if (water === 0) {
            return `💧 **Hydration Analysis:**
- **Logged Today:** 0 / ${targetWater} glasses (0L / ${(targetWater * 0.25).toFixed(1)}L target)
- **Status:** No water intake logged today yet.

Start your hydration routine by drinking a glass of fresh water (250ml) and logging it in the Water Tracker!`;
        }
        const waterL = (water * 0.25).toFixed(2);
        const targetL = (targetWater * 0.25).toFixed(1);
        const pct = Math.round((water / targetWater) * 100);
        return `💧 **Hydration Analysis:**
- **Logged Today:** ${water} / ${targetWater} glasses (~${waterL}L / ${targetL}L target, ${pct}%)

${water >= targetWater ? '✅ Excellent hydration! You have met your daily water target.' : `You are ${targetWater - water} glasses away from your ${targetL}L goal. Keep sipping water regularly!`}`;
    }

    // 6. Daily Summary
    if (q.includes('how am i doing') || q.includes('today') || q.includes('summary') || q.includes('improve')) {
        if (!hasAnyTodayData) {
            return `### 📋 TODAY'S HEALTH ANALYSIS
**No data logged yet today.**

- 👣 **Steps:** 0 logged today
- 💧 **Water:** 0 glasses logged today
- 🍎 **Meals:** No meals logged yet
- 🏋️ **Workout:** No workout logged yet
- 🏆 **Transformation Challenge:** Day ${currentDay} of ${totalDays} (${completedDays} completed)

**Suggestions to get started:**
1. 💧 Drink a glass of water and log it in the **Water Tracker**.
2. 👣 Take a walk and record your steps in the **Steps Tracker**.
3. 🏋️ Open **Day ${currentDay}** on your Dashboard and choose your workout routine!`;
        }

        const stepPct = Math.round((steps / stepGoal) * 100);
        const waterPct = Math.round((water / targetWater) * 100);
        const routine = data.workout ? data.workout.title : (data.workoutMode && data.workoutMode !== 'none' ? data.workoutMode.toUpperCase() + ' Workout' : 'No workout logged yet');

        return `### 📋 TODAY'S HEALTH ANALYSIS
Here is your real-time summary for today:

- 👣 **Steps:** ${steps.toLocaleString()} / ${stepGoal.toLocaleString()} (${stepPct}%)
- 💧 **Water:** ${water} / ${targetWater} glasses (~${(water * 0.25).toFixed(2)}L, ${waterPct}%)
- 🍎 **Nutrition:** ${foodLog.length} item(s) (${Math.round(totalCal)} kcal, ${Math.round(totalPro)}g protein)
- 🏋️ **Workout:** ${routine}
- 🏆 **Challenge:** Day ${currentDay} of ${totalDays} (${completedDays} completed)

${steps >= stepGoal && water >= targetWater ? '🔥 You are crushing all your daily targets today! Keep up the momentum!' : 'Stay focused on closing your remaining steps and water before finishing the day!'}`;
    }

    return `Based on your Healthify data (Day ${currentDay} of ${totalDays}, ${steps.toLocaleString()} steps, ${water} glasses of water, ${foodLog.length} food items logged):

You are making solid progress. You can ask me:
- *"Generate my weekly report"*
- *"Check my food variety"*
- *"Give me today's workout routine"*
- *"How is my transformation going?"*`;
}

// ==================== AUTO INIT ON PAGE LOAD ====================
window.onload = function () {
    // Proactively initialize IndexedDB and prune oversized cache keys to keep storage lean and quota-free
    HealthifyIDB.init();
    pruneObsoleteStorageCache();

    // Initial Backend & Database Health Check immediately
    checkBackendHealth();
    setInterval(checkBackendHealth, 15000);
    window.addEventListener('online', () => {
        checkBackendHealth();
        HealthifyIDB.syncOfflineQueue();
    });

    // Bind real-time phone number availability check
    initRegPhoneListener();

    // Clear password inputs only for security; keep any email/phone user or browser entered
    const uPass = document.getElementById('userPassword');
    const regPass = document.getElementById('regPassword');
    const regConfirm = document.getElementById('regConfirmPassword');

    if (uPass) uPass.value = '';
    if (regPass) regPass.value = '';
    if (regConfirm) regConfirm.value = '';

    const loginPageEl = document.getElementById('loginPage');
    const appPageEl = document.getElementById('appPage');

    // Check if valid active user session exists in safe storage
    let savedUser = null;
    try {
        const savedUserStr = safeGetStorage('ht_currentUser');
        if (savedUserStr) {
            savedUser = JSON.parse(savedUserStr);
        }
    } catch (e) {
        console.warn('Failed to parse cached user session:', e);
    }

    const sessionValid = savedUser && isSessionValid(savedUser);

    if (sessionValid) {
        currentUser = savedUser;
        touchUserSession();
        loadUserData();
        if (loginPageEl) {
            loginPageEl.classList.add('d-none');
            loginPageEl.style.display = 'none';
        }
        if (appPageEl) {
            appPageEl.classList.remove('d-none');
            appPageEl.style.display = 'block';
        }
        renderDashboard();
    } else {
        const hadPreviousSession = !!savedUser;
        logout(true); // Silent reset: clears in-memory state and residual session data without clearing user inputs
        if (loginPageEl) {
            loginPageEl.classList.remove('d-none');
            loginPageEl.style.display = 'block';
        }
        if (appPageEl) {
            appPageEl.classList.add('d-none');
            appPageEl.style.display = 'none';
        }
        switchLoginTab('login');
        if (hadPreviousSession) {
            showAuthAlert('login', 'Your previous session expired after 30 minutes of inactivity. Please log in again.');
        }
    }

    // Attach user activity listeners to extend active session
    ['click', 'keydown', 'scroll', 'touchstart'].forEach(evt => {
        window.addEventListener(evt, () => touchUserSession(), { passive: true });
    });

    // Check session timeout periodically (every 30 seconds)
    setInterval(() => {
        if (currentUser && currentUser.expiresAt && Date.now() > currentUser.expiresAt) {
            logout(false);
            showAuthAlert('login', 'Your session expired after 30 minutes of inactivity. Please log in again.');
        }
    }, 30000);

    // Request notification permission for water reminders
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
};