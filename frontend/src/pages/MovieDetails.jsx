import { useParams } from "react-router-dom";

export default function MovieDetails() {
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
  const { movieId } = useParams();
  const movie = movieData.find((movie) => movie.id === Number(movieId));

  if (!movie) {
    return <div className="container mx-auto p-4">Movie not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={movie.img} alt={movie.title} className="w-full h-auto max-h-96 object-contain" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{movie.title}</h2>
          <p>{movie.description}</p>
        </div>
      </div>
    </div>
  );
}
