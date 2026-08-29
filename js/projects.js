/**
 * Game Programmer Portfolio - Projects Database Architecture
 * Easy to extend and edit project metadata.
 */

const projectsData = [
    
    {
        id: "le-ak",
        title: "Le, Ak",
        thumbnail: "assets/games/leak/GameIcon.png",
        bannerImage: "assets/games/leak/GameIcon.png",
        year: "2026",
        featured: true,
        shortDescription: "A singleplayer game about a man who’s trying to escape a village by finding statues and key while avoiding a supernatural that called Leak.",
        description: "Bli Dadang, an expectant father from a small village who comes home to find his village completely empty. He finds his wife unconscious on the floor, with their unborn child mysteriously gone from her womb. Desperate, he heads to the village head's house near the local Quail for answers, but chased by a Leak along the way. He discovers that the main exit has been closed and locked by the Leak, so he looks for statues to unlock the key’s place in order to open the main gate. As he searches for the key inside the village head's house, every torch suddenly lights up for a warning sign that the Leak has found him.",
        youtube: "mMOZzwyI6ec",
        itch: "https://vinnettayay.itch.io/le-ak",
        github: "https://github.com/vinnettayay/Le-Ak",
        genre: "Horror",
        platform: "PC",
        engine: "Unity",
        teamSize: "4 Developers",
        roles: [
            "Independent Game Programmer",
            "Project Manager",
        ],
        gallery: [
            "assets/games/leak/MainMenu.png",
            "assets/games/leak/Prolog.png",
            "assets/games/leak/ActivateAltar.gif",
            "assets/games/leak/EncounterLeak.gif",
            "assets/games/leak/LeakJumpscare.gif",
            "assets/games/leak/UblikDurability.gif",
            "assets/games/leak/Inventory.png",
            "assets/games/leak/Ending.png",
        ]
    },
    {
        id: "zerospot-opver",
        title: "Zerospot",
        thumbnail: "assets/games/zerospot/PreviewGame.png",
        bannerImage: "assets/games/zerospot/Banner.png",
        year: "2025",
        featured: false, // Render as large featured project on homepage
        shortDescription: "A singleplayer game where the player takes a role of an operator who fights off malfunction germs to protect their company.",
        description: "The game starts with an operator working at a night shift at BioPurge, a research center company. One night, he detects an experimental germ has mutated and entered his room through the ventilation system that connected to the lab. Afraid of the infection might spread throughout the facility, he immediately sterilizes his room and calls his colleague for help. While waiting, he\’s faced with two choices: \n\n- Wait for his colleague to arrive and play safe \n-Take action to the microscopic world to stop the germs spreading.",
        youtube: "yt5I6rB4L1w", // YouTube Video ID
        itch: "https://vinnettayay.itch.io/zerospot-opver",
        genre: "FPS",
        platform: "PC / Web",
        engine: "Unity",
        teamSize: "8 Developers",
        roles: [
            "Independent Game Programmer",
            "Enemy 2D Artist (Level 2-6)",
            "Project Manager",
            "Narrative Designer"
        ],
        gallery: [
            "assets/games/zerospot/MainMenu.png",
            "assets/games/zerospot/Prolog.png",
            "assets/games/zerospot/Level2.png",
            "assets/games/zerospot/Level3.png",
            "assets/games/zerospot/Level4.png",
            "assets/games/zerospot/Level5.png"
        ]
    },
    {
        id: "re-startidol",
        title: "Re:StartIdol",
        thumbnail: "assets/games/re-startidol/MainMenu.png",
        bannerImage: "assets/games/re-startidol/MainMenu.png",
        year: "2025",
        featured: false,
        shortDescription: "A single-player game where the player works at an idol agency as a manager who will manage the company's budget and the idols.",
        description: "Starts as an unemployment.  Hearing the news about a job vacancy as a manager.  The player is interested in applying. Meet the idol leader for an interview, and start working as a manager if accepted.",
        youtube: "A_-ZCP1zRdg",
        itch: "https://vinnettayay.itch.io/re-startidol",
        github: "", // Empty string hides GitHub button
        genre: "Visual Novel / Rhythm",
        platform: "PC",
        engine: "Unity",
        teamSize: "2 Developers",
        roles: [
            "Independent Game Programmer",
            "Project Manager",
        ],
        gallery: [
            "assets/games/re-startidol/Interview.png",
            "assets/games/re-startidol/VocalTraining.png",
            "assets/games/re-startidol/DanceTraining.png",
            "assets/games/re-startidol/PickAStudio.png"
        ]
    },
];