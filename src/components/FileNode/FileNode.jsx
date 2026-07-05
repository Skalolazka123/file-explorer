import { useState } from "react";
import "./FileNode.css";

const isDirectory = (node) => node.type === "folder";

const FileNode = ({ name, data, path = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = `${path}/${name}`;

  const isFolder = isDirectory(data);
  // Check if there are children and the children object is not empty
  const hasChildren = data.children && Object.keys(data.children).length > 0;

  // No data, don't render anything
  if (!data) return null;

  return (
    <div className="file-node">
      {/* 1. Render current node */}
      <div
        className={`node-item ${isFolder ? "folder" : "file"} ${
          isFolder && isOpen ? "folder-open" : ""
        }`}
        onClick={() => isFolder && setIsOpen(!isOpen)}
        title={`Path: ${currentPath}`}
      >
        <span>{isFolder ? (isOpen ? "📂" : "📁") : "📄"}</span>
        <span>{name}</span>
      </div>

      {/* 2. Render child nodes only if it is a folder, it is open and it has content. */}
      {isFolder && isOpen && (
        <div className="children-container">
          {hasChildren ? (
            Object.entries(data.children).map(([childName, childData]) => (
              <FileNode
                key={currentPath + "/" + childName}
                name={childName}
                data={childData}
                path={currentPath}
              />
            ))
          ) : (
            <div className="empty-message">
              <span>Empty folder</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileNode;
