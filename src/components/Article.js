import axios from "axios";
import React, { useState } from "react";

const Article = ({ article }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const dateFormater = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    return newDate;
  };

  const handleEdit = () => {
    if (isEditing) {
      const data = {
        author: article.author,
        content: editContent ? editContent : article.content,
        date: article.date,
        updateDate: Date.now(),
      };
      axios.put("http://localhost:3004/articles/" + article.id, data);
    }
  };

  const handleDelete = () => {
    axios.delete("http://localhost:3004/articles/" + article.id);
  };

  return (
    <div
      className="article"
      style={{ background: isEditing ? "#f3feff" : "white" }}
    >
      <div className="card-header">
        <h3>{article.author}</h3>
        <em>Posté le {dateFormater(article.date)}</em>
      </div>
      {isEditing ? (
        <textarea
          defaultValue={editContent ? editContent : article.content}
          autoFocus
          onChange={(e) => setEditContent(e.target.value)}
        ></textarea>
      ) : (
        <p>{editContent ? editContent : article.content}</p>
      )}
      <div className="btn-container">
        <button
          onClick={(e) => {
            if (!isEditing) {
              setIsEditing(true);
              e.target.textContent = "Validez";
            } else {
              handleEdit();
              setIsEditing(false);
              e.target.textContent = "Edit";
            }
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (
              window.confirm("Voulez-vous vraiment supprimer cet article ?")
            ) {
              handleDelete();
              window.location.reload();
            }
          }}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default Article;
