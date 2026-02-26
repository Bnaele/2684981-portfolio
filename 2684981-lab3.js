function getMusicTitlesByYear(tracks) {
    const grouped = {};
    
    if (!Array.isArray(tracks)) return grouped;
    for (const track of tracks) {
        if (!track || typeof track !== 'object') continue;

        const year = track.year;
        const title = track.title;


        if (typeof year !== 'number') continue;

        if (typeof title !== 'string' || title.trim() === '') continue;

        if (!grouped[year]) {
            grouped[year] = [];
        }

        grouped[year].push(title);
    }


    for (const year in grouped) {
        grouped[year].sort();
    }

    return grouped;
}


function filterAndTransformTracks(tracks, criteria) {
    const result = [];

    // Graceful defaults
    if (!Array.isArray(tracks)) return result;
    criteria = criteria && typeof criteria === 'object' ? criteria : {};

    for (const track of tracks) {
        if (!track || typeof track !== 'object') continue;

        const title = track.title;
        const artist = track.artist;
        const year = track.year;

       
        if (typeof title !== 'string' || title.trim() === '') continue;
        if (typeof artist !== 'string' || artist.trim() === '') continue;
        if (typeof year !== 'number') continue;

     
        if (criteria.minYear !== undefined && year < criteria.minYear) continue;

       
        if (criteria.maxYear !== undefined && year > criteria.maxYear) continue;

       
        if (criteria.artist !== undefined) {
            if (typeof criteria.artist !== 'string') continue; 
            if (artist.toLowerCase() !== criteria.artist.toLowerCase()) continue;
        }

        const decadeStart = Math.floor(year / 10) * 10;
        const decade = `${decadeStart}s`;

        result.push({ title, artist, year, decade });
    }

    return result;
}

module.exports = {
    getMusicTitlesByYear,
    filterAndTransformTracks
};
