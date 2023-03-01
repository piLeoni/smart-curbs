const index = {
    intro: {
        title: 'Leveraging Artificial Intelligence to understand how curbs are used in real-time.'
    },
    credits: [{
            institution: 'Senseable City Lab',
            team: [
                "Carlo Ratti",
                "Fabio Duarte",
                "Arianna Salazar-Miranda",
                "Fan Zhang",
                "Maoran Sun",
                "Pietro Leoni",
                "Zhuangyuan Fan",
                "Ricardo Alvarez",
                "Meghan Timmons",
            ]
        },
        {
            institution: 'RATP',
            team: [
                "Côme Berbain",
                "Dominique Servier-Crouzat",
                "Shadi Sadeghian",
                "Nathanael Mifsud-Couchaux",
                "Thibaut Durand",
                "Pauline Baudry",
                "Olivier Condore",
                "Michael Colomer",
                "Philippe Mader"
            ]
        }
    ],
    papers: [{
            journal: 'Landscape and Urban Planning (2023)',
            title: 'Smart Curbs: Measuring the Real-Time Use of Streets Using Computer Vision',
            authors: `Arianna Salazar-Miranda, Fan Zhang, Maoran Sun, Pietro Leoni, Fabio Duarte, Carlo Ratti`,
            link: 'https://senseable.mit.edu/papers/pdf/202300227_SalazarMiranda-etal_SmartCurbs_LUP.pdf'
        },
        {
            journal: 'Cities (2022)',
            title: 'Measuring the Impact of Slow Zones on Street Life Using Social Media',
            authors: `Arianna Salazar-Miranda, Cate Heine, Fabio Duarte, Katja Schechtner, Carlo Ratti`,
            link: 'https://senseable.mit.edu/papers/pdf/20221028_SalazarMiranda_MeasuringImpact_Cities.pdf'
        },

    ]
}
const bigData = {
    intro: {
        title: `Curb Types`,
        subtitle: `Leveraging publicly available data to measure the defining spatial qualities of curbs.`,
        body: `To summarize the different built environments that characterize Parisian curbs, 
        we divide the city into 100x100-meter cells and combine data from the Paris Open Data portal, 
        Google Street View images, and Google Places to compute measurements of the built environment for each cell. 
        <br/>
        Using Machine learning algorithms, we categorize each of the resulting 10,000 cells of Paris into one of six typologies, 
        ranging from Urban Hotspots that have the most commercial activity to Calm Streets typical of residential environments. 
        <br/>
        Explore all the typologies and their spatial distribution. 
        `
    },
    slides: {
        title: `Lorem Ipsum`,
        subtitle: `Incidunt ut labore et dolore magnam aliquam quaerat voluptatem.`,
        body: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
        veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
        images: [
            { url: "slides/ratp_slides_Page_02.jpg" },
            { url: "slides/ratp_slides_Page_03.jpg" },
            { url: "slides/ratp_slides_Page_04.jpg" },
            { url: "slides/ratp_slides_Page_05.jpg" },
            { url: "slides/ratp_slides_Page_06.jpg" },
            { url: "slides/ratp_slides_Page_07.jpg" },
            { url: "slides/ratp_slides_Page_08.jpg" }
        ]
    },
    typologies: {
        diagram: [
            { map: "typologies/1A.jpg", polar: "typologies/1B.png", label: "Connected Nodes", details: "Multiple metro stations and bus stops, heavy pedestrian flow." },
            { map: "typologies/2A.jpg", polar: "typologies/2B.png", label: "Urban Hotspot", details: "Abundant events and commercial activities." },
            { map: "typologies/3A.jpg", polar: "typologies/3B.png", label: "Calm Streets", details: "Has narrow streets and limited activities." },
            { map: "typologies/4A.jpg", polar: "typologies/4B.png", label: "Open Corridors", details: "Has large open space usually in the intersection of roads." },
            { map: "typologies/5A.jpg", polar: "typologies/5B.png", label: "Green Zone", details: "Has large green public space." },
            { map: "typologies/6A.jpg", polar: "typologies/6B.png", label: "Multimodal Hubs", details: "Has marked bus and bike lanes, lots of bikers presence." }
        ]
    },
    diagramMap: {
        categories: [{
                label: "analysis",
                values: [
                    // {
                    //     key: 'connected_nodes',
                    //     label: 'connected nodes',
                    //     min: 0,
                    //     max: 1,
                    //     intro: `Multiple metro stations and bus stops; heavy pedestrian flow.                        `
                    // },
                    {
                        key: 'urban_hotspots',
                        label: 'urban hotspots',
                        min: 0,
                        max: 1,
                        intro: `Abundant events and commercial activities.`
                    },
                    {
                        key: 'calm_street',
                        label: 'calm street',
                        min: 0,
                        max: 1,
                        intro: `Has narrow streets and limited activities.`
                    },
                    {
                        key: 'open_corridor',
                        label: 'open corridor',
                        min: 0,
                        max: 1,
                        intro: `Has large open space usually in the intersection of roads.`
                    },
                    {
                        key: 'green_zones',
                        label: 'green zones',
                        min: 0,
                        max: 1,
                        intro: `Has large green public space.`
                    },
                    {
                        key: 'multimodal_hubs',
                        label: 'multimodal hubs',
                        min: 0,
                        max: 1,
                        intro: `Has marked bus and bike lanes, lots of bikers presence.`
                    }
                ],
            },
            // {
            //     label: 'raw data',
            //     values: [
            //         // { key: 'id', label: 'id', min: 0, max: 17163 },
            //         // { key: 'grid_area', label: 'grid area', min: 0, max: 10003 },
            //         // { key: 'unique_id', label: 'unique id', min: 0, max: 17162 },
            //         { key: 'curb_lengt', label: 'curb lengt', min: 0, max: 983, intro: standardIntro() },
            //         { key: 'curb_parki', label: 'curb parki', min: 0, max: 2, intro: standardIntro() },
            //         { key: 'builtarea', label: 'builtarea', min: 0, max: 7900, intro: standardIntro() },
            //         { key: 'height_ave', label: 'height ave', min: 0, max: 92, intro: standardIntro() },
            //         { key: 'road_area', label: 'road area', min: 0, max: 9967, intro: standardIntro() },
            //         { key: 'terrace_ar', label: 'terrace ar', min: 0, max: 969, intro: standardIntro() },
            //         { key: 'tree_count', label: 'tree count', min: 0, max: 415, intro: standardIntro() },
            //         { key: 'tree', label: 'tree', min: 0, max: 1, intro: standardIntro() },
            //         { key: 'road', label: 'road', min: 0, max: 1, intro: standardIntro() },
            //         { key: 'sky', label: 'sky', min: 0, max: 1, intro: standardIntro() },
            //         { key: 'sidewalk', label: 'sidewalk', min: 0, max: 1, intro: standardIntro() },
            //         { key: 'poi_var', label: 'poi var', min: 0, max: 6, intro: standardIntro() },
            //         { key: 'poi_count', label: 'poi count', min: 0, max: 8, intro: standardIntro() },
            //         { key: 'bikelane_l', label: 'bikelane l', min: 0, max: 819, intro: standardIntro() },
            //         { key: 'bus_st_cou', label: 'bus st cou', min: 0, max: 10, intro: standardIntro() },
            //         { key: 'bike_st_co', label: 'bike st co', min: 0, max: 2, intro: standardIntro() },
            //         // { key: 'ward_clust', label: 'ward clust', min: 0, max: 6 },
            //         { key: 'cluster', label: 'cluster', min: 0, max: 6, intro: standardIntro() },
            //         { key: 'activity_a', label: 'activity a', min: 0, max: 34, intro: standardIntro() }
            //     ]
            // }
        ]
    }


}

function standardIntro() {
    return `At vero eos et accusamus et iusto odio 
dignissimos ducimus qui blanditiis praesentium voluptatum deleniti 
atque corrupti quos dolores et quas molestias excepturi sint 
occaecati cupiditate non provident, similique sunt in culpa qui officia 
deserunt mollitia animi, id est laborum et dolorum fuga.`
};



const innovatingCurbs = {
    intro: {
        title: `Innovating Curbs`,
        subtitle: `Envision the curb of the future through a series of exploratory projects.`,
        body: `Curbs must be rethought to be safe, welcoming, and empowering to all users. 
        We conducted an ideation process with curb planners and managers, transportation users, 
        and citizens to rethink the future of curbs. This ideation process culminated in a portfolio 
        of over 40 ideas evaluated and scored over eight dimensions related to value, feasibility, and cost. 
        <br/>
        These ideas ranged from scanners mounted on buses to monitor human activity and parking patterns, 
        utilizing artificial intelligence algorithms embedded in urban infrastructure to monitor jaywalking events, 
        and measuring the microclimate of streetscapes in the city. 
        `
    },
    slides: {
        subtitle: `Envisioning the future of curbs`,
        body: `The RATP and SCL teams generated an initial portfolio of ideas to envision the future of curbs.`,
        images: [{
                url: "slides/edit/1.jpg",
                intro: `What types of vehicular and pedestrian activities take place along curbs? In Paris Flows, 
                e construct comprehensive measurements of street use that capture both their intensity and use to study curbside mobility and occupation.`
            },
            {
                url: "slides/edit/2.jpg",
                intro: `What are the spatial and temporal signatures of parking utilization?
                In parking dynamics, we aim to analyze the efficient allocation of curbs by comparing 
                available parking spots to their actual utilization patterns. 
                `
            },
            {
                url: "slides/edit/3.jpg",
                intro: `Are curbs accessible for people with disabilities? In Friendly Curbs, 
                we aim to evaluate accessibility conditions on sidewalks and streets of Paris and 
                assess the city's curb friendliness towards pedestrians. 
            `
            }

        ]
    },
    typologies: {
        diagram: [
            { map: "typologies/1A.jpg", polar: "typologies/1B.png", label: "Connected Nodes", details: "Multiple metro stations and bus stops, heavy pedestrian flow." },
            { map: "typologies/2A.jpg", polar: "typologies/2B.png", label: "Urban Hotspot", details: "Abundant events and commercial activities." },
            { map: "typologies/3A.jpg", polar: "typologies/3B.png", label: "Calm Streets", details: "Has narrow streets and limited activities." },
            { map: "typologies/4A.jpg", polar: "typologies/4B.png", label: "Open Corridors", details: "Has large open space usually in the intersection of roads." },
            { map: "typologies/5A.jpg", polar: "typologies/5B.png", label: "Green Zone", details: "Has large green public space." },
            { map: "typologies/6A.jpg", polar: "typologies/6B.png", label: "Multimodal Hubs", details: "Has marked bus and bike lanes, lots of bikers presence." }
        ]
    }
}


const realTimeCurbs = {
    intro: {
        title: `Real-time Curbs`,
        subtitle: `Measuring how streets are used in real-time.`,
        body: `Curbs are in the midst of change as users compete to park vehicles, board buses, hail rides, 
        drop off shared mopeds, pick up free-floating scooters, and deliver packages. We develop a methodology to 
        capture these real-time dynamics that can be deployed at scale for entire cities, revealing the complexities and nuances of street use. 
        <br/>
        We equipped buses with a scanner that collected more than 800,000 real-time images of Parisian streets over five weeks and used computer 
        vision techniques to process these images and classify them depending on how space was being used. Our model can recognize up to 30 categories 
        of human activity and transportation, from people walking or standing to distinguishing between cars, vans, and other modes of transportation.`
    },
    diagrams: {
        intro: {
            subtitle: `Ipsum quia dolor sit amet, consectetur, adipisci`,
            body: `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
        sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.`
        },
        drawings: [{
                url: "diagrams/CASE_diagrams-03.svg",
                label: 'Camera Module',
                details: `The device captures images of the external surroundings of the bus every 3 seconds. 
                This approach allows for gathering data on street use without requiring any intervention by the bus operator. 
                The device processes the images locally without saving any images, 
                allowing us to construct rich metrics on street use without storing images and respecting individual privacy. 
                `
            },

        ]
    },
    lineGrid: {
        intro: `The map shows the average number of activities along the public transport line where we conducted the experiment over four weeks.`,
        fields: [
            // { label: 'typ_id', key: 'typ_id', max: 5668 },
            // { label: 'l_70_d.x', key: 'l_70_d.x', max: 1 },
            // { label: 'l_70_d.y', key: 'l_70_d.y', max: 1 },
            // { label: 'number_obs', key: 'number_obs', max: 16673 },
            // { label: 'count alt', key: 'count_alt', max: 0.8857696 },
            { label: 'passersby', key: 'sum_people', max: 3.0229771 },
            // { label: 'people walking', key: 'count_walk_stand', max: 3.0229771 },
            // { label: 'people queuing', key: 'count_queuing', max: 0.0181818 },
            { label: 'stayers', key: 'count_sit', max: 0.060725 },
            { label: 'cars', key: 'count_car', max: 4.7167411 },
            { label: 'vans', key: 'count_van', max: 0.6470588 },
            { label: 'buses', key: 'count_bus', max: 0.9442124 },
            { label: 'micro-mobility', key: 'count_motorcycle', max: 1.1669905 },
            // { label: 'childrens', key: 'count_children', max: 0.0037879 },
            // { label: 'skateboarders', key: 'count_skateboarder', max: 0.0185412 },
            // { label: 'trucks', key: 'count_truck', max: 0.0980392 },
            // { label: 'scooters', key: 'count_riding_scooter', max: 0.0169587 }
        ]
    },

    activeScore: {
        fields: [{
                label: 'residential',
                key: 'residential',
                max: 77,
                intro: `Residential environments throughout the bus lines receive a moderate to a high number of active mobility modes.`
            },
            {
                label: 'recreation',
                key: 'recreation',
                max: 58,
                intro: `Environments classified as recreation exhibit the lowest number of active mobility modes.`
            },
            {
                label: 'transport',
                key: 'transport',
                max: 100,
                intro: `Both retail and transport environment exhibit the largest number of active mobility modes closer to the city center.`
            },
            {
                label: 'retail',
                key: 'retail',
                max: 77,
                intro: `Both retail and transport environment exhibit the largest number of active mobility modes closer to the city center.`
            }
        ]
    },
    curbsActivities: {
        fields: [{
            label: 'speed',
            key: 'speed',
            max: 77,
            intro: `At vero eos et accusamus et iusto odio 
            dignissimos ducimus qui blanditiis praesentium voluptatum deleniti 
            atque corrupti quos dolores et quas molestias excepturi sint 
            occaecati cupiditate non provident, similique sunt in culpa qui officia 
            deserunt mollitia animi, id est laborum et dolorum fuga.`
        }]
    },
    peaks: {
        intro: `At vero eos et accusamus et iusto odio 
        dignissimos ducimus qui blanditiis praesentium voluptatum deleniti 
        atque corrupti quos dolores et quas molestias excepturi sint 
        occaecati cupiditate non provident, similique sunt in culpa qui officia 
        deserunt mollitia animi, id est laborum et dolorum fuga.`,
        categories: [{
                label: 'bus speed',
                key: 'speed',
                max: 24.27603773584905,
                intro: `Mobility patterns around bus stops - Count of large vehicles. 
                In the morning, Saint-André des Arts  receives the largest number of large vehicles,
                 while Les Vignes – Boulainvilliers receives the lowest.
                 During the afternoon, Péclet receives the largest number of 
                 large vehicles and Les Moulins - Camping receives the lowest.`,
            },
            {
                label: 'vehicular activity',
                key: 'vehicle_count',
                max: 0.6072874493927125,
                intro: `Duis aute irure dolor in reprehenderit in voluptate 
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
            sunt in culpa qui officia deserunt mollit anim id est laborum.`,
            },
            {
                label: 'pedestrian activity',
                key: 'active_count',
                max: 2.4862745098039216,
                intro: `At vero eos et accusamus et iusto odio 
        dignissimos ducimus qui blanditiis praesentium voluptatum deleniti 
        atque corrupti quos dolores et quas molestias excepturi sint 
        occaecati cupiditate non provident, similique sunt in culpa qui officia 
        deserunt mollitia animi, id est laborum et dolorum fuga.`,
            }
        ]

    },
    busStops: {

        intro: `Count of large vehicles (vans, buses, trucks) and active mobility modes 
        (pedestrians, scooters, bicycles, and skateboarders) within a 50-meter buffer of bus stops.
        Can be used to identify the best location for bus stops.`,

        stops: [{
                label: 'Châtelet - Quai de Gesvres',
                key: 'Châtelet - Quai de Gesvres',
                coordinates: [2.348043275672035, 48.856946563962744]
            },
            {
                label: 'Hôpital Des Enfants Malades',
                key: 'Hôpital Des Enfants Malades',
                coordinates: [2.316438381549582, 48.846719718992624]
            },
            {
                label: 'Place du Docteur Hayem - Radio France',
                key: 'Place du Docteur Hayem - Radio France',
                coordinates: [2.276462276424856, 48.85234560188056]
            },
            {
                label: 'Péclet',
                key: 'Péclet',
                coordinates: [2.298435876329443, 48.84293005416907]
            },
            {
                label: 'Saint-André Des Arts',
                key: 'Saint-André Des Arts',
                coordinates: [2.338977844192117, 48.85408486706763]
            },
            {
                label: 'Sèvres - Babylone',
                key: 'Sèvres - Babylone',
                coordinates: [2.32646916633411, 48.85107317184528]
            }
        ]
    }


}



// const peaks = {
//     intro: `At vero eos et accusamus et iusto odio 
//     dignissimos ducimus qui blanditiis praesentium voluptatum deleniti 
//     atque corrupti quos dolores et quas molestias excepturi sint 
//     occaecati cupiditate non provident, similique sunt in culpa qui officia 
//     deserunt mollitia animi, id est laborum et dolorum fuga.`,
//     categories: [{
//             label: 'speed',
//             key: 'speed',
//             max: 24.27603773584905,
//             intro: `Ratione voluptatem sequi nesciunt. 
//             Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
//             Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
//             sed quia consequuntur magni dolores eos qui.`,
//         },
//         {
//             label: 'vehicles count',
//             key: 'vehicle_count',
//             max: 0.6072874493927125,
//             intro: `Duis aute irure dolor in reprehenderit in voluptate 
//         velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
//         sunt in culpa qui officia deserunt mollit anim id est laborum.`,
//         },
//         {
//             label: 'active count',
//             key: 'active_count',
//             max: 2.4862745098039216,
//             intro: `At vero eos et accusamus et iusto odio 
//     dignissimos ducimus qui blanditiis praesentium voluptatum deleniti 
//     atque corrupti quos dolores et quas molestias excepturi sint 
//     occaecati cupiditate non provident, similique sunt in culpa qui officia 
//     deserunt mollitia animi, id est laborum et dolorum fuga.`,
//         }
//     ]

// }

export default { pages: { index, bigData, innovatingCurbs, realTimeCurbs } }