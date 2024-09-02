import { useNavigate } from "react-router-dom";

export default function MovieCard() {
  const movieData = [
    {
      id: 1,
      title: "Movie Title",
      img: "/animal.jpeg",
      description:
        "Movie Decription,Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse dolor veniam quo rerum accusantium perspiciatis unde eveniet cum dolores repellendus, in maiores rem dolore amet alias. Autem commodi eius vel.",
    },
    {
      id: 2,
      title: "Movie Title",
      img: "/beekeeper.jpg",
      description:
        "Movie Decription,Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse dolor veniam quo rerum accusantium perspiciatis unde eveniet cum dolores repellendus, in maiores rem dolore amet alias. Autem commodi eius vel.",
    },
    {
      id: 3,
      title: "Movie Title",
      img: "/fallguy.jpeg",
      description:
        "Movie Decription,Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse dolor veniam quo rerum accusantium perspiciatis unde eveniet cum dolores repellendus, in maiores rem dolore amet alias. Autem commodi eius vel.",
    },
    {
      id: 4,
      title: "Movie Title",
      img: "/fighter.jpg",
      description:
        "Movie Decription,Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse dolor veniam quo rerum accusantium perspiciatis unde eveniet cum dolores repellendus, in maiores rem dolore amet alias. Autem commodi eius vel.",
    },
    {
      id: 5,
      title: "Movie Title",
      img: "/lift.avif",
      description:
        "Movie Decription,Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse dolor veniam quo rerum accusantium perspiciatis unde eveniet cum dolores repellendus, in maiores rem dolore amet alias. Autem commodi eius vel.",
    },
    {
      id: 123,
      title: "Movie Title",
      img: "/painter.avif",
      description:
        "Movie Decription,Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse dolor veniam quo rerum accusantium perspiciatis unde eveniet cum dolores repellendus, in maiores rem dolore amet alias. Autem commodi eius vel.",
    },
    {
      id: 1566,
      title: "Movie Title",
      img: "/animal.jpeg",
      description:
        "Movie Decription,Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse dolor veniam quo rerum accusantium perspiciatis unde eveniet cum dolores repellendus, in maiores rem dolore amet alias. Autem commodi eius vel.",
    },
    {
      id: 1644,
      title: "Movie Title",
      img: "/beekeeper.jpg",
      description:
        "Movie Decription,Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse dolor veniam quo rerum accusantium perspiciatis unde eveniet cum dolores repellendus, in maiores rem dolore amet alias. Autem commodi eius vel.",
    },
    {
      id: 16161,
      title: "Movie Title",
      img: "/fallguy.jpeg",
      description:
        "Movie Decription,Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse dolor veniam quo rerum accusantium perspiciatis unde eveniet cum dolores repellendus, in maiores rem dolore amet alias. Autem commodi eius vel.",
    },
    {
      id: 1941,
      title: "Movie Title",
      img: "/fighter.jpg",
      description:
        "Movie Decription,Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse dolor veniam quo rerum accusantium perspiciatis unde eveniet cum dolores repellendus, in maiores rem dolore amet alias. Autem commodi eius vel.",
    },
    // Add more movie objects as needed
  ];

  const navigate = useNavigate();

  const handleClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-center gap-4">
        {movieData.map((movie) => (
          <div
            key={movie.id}
            className="card bg-base-100 w-96 shadow-xl cursor-pointer"
            onClick={() => handleClick(movie.id)}
          >
            <figure>
              <img src={movie.img} alt={movie.title} className="w-full h-auto max-h-96 object-contain" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{movie.title}</h2>
              <p>{movie.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
