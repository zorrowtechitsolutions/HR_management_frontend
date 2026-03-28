import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetAUserByIdQuery, useUpdateUserMutation } from "../../app/service/user";
import {
  PencilIcon,
  XMarkIcon,
  CheckIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  PlusIcon
} from "@heroicons/react/24/outline";

const EmployeeProfile = () => {
  const { id } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const { data, isLoading, isError, refetch } = useGetAUserByIdQuery(id);
  const [updateUser] = useUpdateUserMutation();

  const employee = data?.data;

  // INIT
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee?.name || "",
        designation: employee?.designation || "",
        address: employee?.address || "",
        email: employee?.email || "",
        mobile: employee?.mobile || "",
        about: employee?.about || "",
        skills: employee?.skills || [],
        totalProjects: employee?.totalProjects || 0,
        completedProjects: employee?.completedProjects || 0,
        rating: employee?.rating || 0
      });
    }
  }, [employee]);

  // HANDLERS
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // SKILLS
  const handleSkillChange = (index, value) => {
    const updated = [...(formData?.skills || [])];
    updated[index] = value;
    setFormData(prev => ({ ...prev, skills: updated }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...(prev.skills || []), ""]
    }));
  };

  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  // SAVE
  const handleSave = async () => {
    try {
      await updateUser({
        id,
        ...formData,
        skills: formData.skills.map(s => s.trim()),
        totalProjects: Number(formData.totalProjects),
        completedProjects: Number(formData.completedProjects),
        rating: Number(formData.rating)
      }).unwrap();

      await refetch();
      setIsEditing(false);
    } catch {
      console.log("Update failed");
    }
  };

  const displaySkills = isEditing
    ? formData?.skills || []
    : employee?.skills || [];

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;
  if (isError) return <div className="p-10 text-red-500 text-center">Error</div>;
  if (!employee || !formData) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl text-white mb-6 p-10 text-center shadow">

        <h2 className="text-2xl font-semibold">{employee?.name}</h2>
        <p className="text-gray-300">{employee?.designation}</p>

        <div className="mt-6">
          <img
            src={`https://ui-avatars.com/api/?name=${employee?.name || "User"}`}
            className="w-24 h-24 rounded-full mx-auto border-4 border-white"
            alt="avatar"
          />
        </div>

        <p className="mt-3 text-gray-300">{employee?.address}</p>
        <p className="mt-1">📞 {employee?.mobile}</p>

        {/* STATS */}
        <div className="flex justify-center gap-12 mt-6 text-center">

          {/* TOTAL */}
          <div>
            {isEditing ? (
              <input
                type="number"
                value={formData?.totalProjects || 0}
                onChange={(e) => handleInputChange("totalProjects", e.target.value)}
                className="w-20 text-center text-black bg-white rounded px-2 py-1"
              />
            ) : (
              <p className="text-xl font-semibold text-white">
                {formData?.totalProjects ?? employee?.totalProjects ?? 0}
              </p>
            )}
            <p className="text-xs text-gray-300">Total Projects</p>
          </div>

          {/* COMPLETED */}
          <div>
            {isEditing ? (
              <input
                type="number"
                value={formData?.completedProjects || 0}
                onChange={(e) => handleInputChange("completedProjects", e.target.value)}
                className="w-20 text-center text-black bg-white rounded px-2 py-1"
              />
            ) : (
              <p className="text-xl font-semibold text-white">
                {formData?.completedProjects ?? employee?.completedProjects ?? 0}
              </p>
            )}
            <p className="text-xs text-gray-300">Completed</p>
          </div>

          {/* RATING */}
          <div>
            {isEditing ? (
              <input
                type="number"
                step="0.1"
                max="5"
                value={formData?.rating || 0}
                onChange={(e) => handleInputChange("rating", e.target.value)}
                className="w-20 text-center text-black bg-white rounded px-2 py-1"
              />
            ) : (
              <p className="text-xl font-semibold text-white">
                ⭐ {formData?.rating ?? employee?.rating ?? 0}
              </p>
            )}
            <p className="text-xs text-gray-300">Rating</p>
          </div>

        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Employee Profile</h1>

        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg flex gap-2 hover:bg-purple-700 transition disabled:opacity-50"
          >
            <PencilIcon className="w-4 h-4" />
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="border px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg flex gap-2 hover:bg-purple-700 transition disabled:opacity-50"
            >
              <CheckIcon className="w-4 h-4" />
              Save
            </button>
          </div>
        )}
      </div>

      {/* ABOUT */}
      <div className="bg-white p-5 rounded border mb-4">
        <h3 className="font-medium mb-2 flex items-center gap-2">
          <DocumentTextIcon className="w-5 h-5" />
          About
        </h3>

        {isEditing ? (
          <textarea
            value={formData?.about || ""}
            onChange={(e) => handleInputChange("about", e.target.value)}
            className="w-full border p-2 rounded  "
          />
        ) : (
<div>
  <p
    className="text-sm whitespace-pre-wrap transition-all duration-300"
    style={
      isExpanded
        ? {}
        : {
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }
    }
  >
    {employee?.about || "No bio"}
  </p>

  {/* BUTTON */}
  {employee?.about && employee.about.length > 120 && (
    <button
      onClick={() => setIsExpanded(prev => !prev)}
      className="text-black-600 text-sm mt-2 hover:bg-blue-100 hover:text-blue-800"
    >
      {isExpanded ? "Show less" : "Read more"}
    </button>
  )}
</div>
        )}
      </div>

      {/* SKILLS */}
      <div className="bg-white p-5 rounded border">
        <div className="flex justify-between mb-3">
          <h3 className="font-medium flex items-center gap-2">
            <AcademicCapIcon className="w-5 h-5" />
            Skills
          </h3>

          {isEditing && (
            <button
              onClick={addSkill}
              className="flex items-center gap-1 text-blue-600"
            >
              <PlusIcon className="w-4 h-4" />
              Add
            </button>
          )}
        </div>

        {displaySkills.map((skill, i) => (
          <div key={i} className="flex gap-2 mb-2">
            {isEditing ? (
              <>
                <input
                  value={skill}
                  onChange={(e) => handleSkillChange(i, e.target.value)}
                  className="flex-1 border px-2 py-1 rounded"
                />
                <button onClick={() => removeSkill(i)} className="text-red-500">
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </>
            ) : (
              <span>{skill}</span>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default EmployeeProfile;