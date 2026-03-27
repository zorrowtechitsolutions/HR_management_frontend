



import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const UpdateEmployeeModal = ({ open, onOpenChange, employee, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    department: "",
    designation: "",
    address: "",
    dateOfBirth: "",
    education: "",
    experience: "",
    about: "",
    salary: "",
    joiningDate: "",
    lastPromotionDate: "",
    workLocation: "",
    skills: "",
    status: ""
  });

  const [errors, setErrors] = useState({});

  // ✅ Prefill data when modal opens
  useEffect(() => {
    if (open && employee) {
      setFormData({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        gender: employee.gender || "",
        mobile: employee.mobile || "",
        email: employee.email || "",
        password: "",
        confirmPassword: "",
        role: employee.role || "",
        department: employee.department || "",
        designation: employee.designation || employee.role || "",
        address: employee.address || "",
        dateOfBirth: employee.dateOfBirth?.slice(0, 10) || "",
        education: employee.education || "",
        experience: employee.experience || "",
        about: employee.about || "",
        salary: employee.salary || "",
        joiningDate: employee.joiningDate?.slice(0, 10) || "",
        lastPromotionDate: employee.lastPromotionDate?.slice(0, 10) || "",
        workLocation: employee.workLocation || "",
        skills: Array.isArray(employee.skills)
          ? employee.skills.join(", ")
          : employee.skills || "",
        status: employee.status || "Active"
      });
      setErrors({});
    }
  }, [open, employee]);

  // ✅ Validation (similar to create modal)
  const validateForm = () => {
    const err = {};

    if (!formData.firstName.trim()) err.firstName = "First name is required";
    if (!formData.lastName.trim()) err.lastName = "Last name is required";
    if (!formData.gender) err.gender = "Gender is required";

    if (!formData.mobile.trim()) err.mobile = "Mobile is required";
    else if (!/^[0-9]{10}$/.test(formData.mobile))
      err.mobile = "Must be 10 digits";

    if (!formData.email.trim()) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      err.email = "Invalid email format";

    // Password validation (only if password is provided)
    if (formData.password) {
      if (
        !/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/.test(formData.password)
      ) {
        err.password =
          "Min 6 chars, 1 uppercase, 1 number, 1 special char";
      }
    }

    if (formData.password !== formData.confirmPassword)
      err.confirmPassword = "Passwords do not match";

    if (!formData.department) err.department = "Department is required";
    if (!formData.designation) err.designation = "Designation is required";
    if (!formData.address) err.address = "Address is required";
    if (!formData.dateOfBirth) err.dateOfBirth = "Date of birth is required";
    if (!formData.education) err.education = "Education is required";

    if (!formData.salary) err.salary = "Salary is required";
    else if (formData.salary <= 0) err.salary = "Salary must be greater than 0";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Prepare the update payload
      const updatePayload = {
        _id: employee._id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        mobile: formData.mobile,
        email: formData.email,
        role: formData.role,
        department: formData.department,
        designation: formData.designation,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth,
        education: formData.education,
        experience: formData.experience,
        about: formData.about,
        salary: Number(formData.salary),
        joiningDate: formData.joiningDate,
        lastPromotionDate: formData.lastPromotionDate,
        workLocation: formData.workLocation,
        skills: formData.skills
          ? formData.skills.split(",").map((s) => s.trim())
          : [],
        status: formData.status
      };

      // Only include password if it was changed
      if (formData.password) {
        updatePayload.password = formData.password;
      }

      onUpdate(updatePayload);
      onOpenChange(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-purple-600 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <h2 className="text-lg font-semibold">Update Employee</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="hover:bg-purple-700 p-1 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        {/* Form */}
        <form className="p-6 overflow-y-auto flex-1" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg border-gray-300 text-sm ${errors.firstName ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none`}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.lastName ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none`}
              />
              {errors.lastName && (
                <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.gender ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none`}

              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-xs text-red-500 mt-1">{errors.gender}</p>
              )}

            </div>



            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile *
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.mobile ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none`}
              />
              {errors.mobile && (
                <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
              )}
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.email ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password (Optional)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.password ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none`}
                placeholder="Leave blank to keep current password"
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none`}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                <option value="">Select Role</option>
                <option value="Intern">Intern</option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="HR">HR</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department *
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.department ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none`}
              />
              {errors.department && (
                <p className="text-xs text-red-500 mt-1">{errors.department}</p>
              )}
            </div>

            {/* Designation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Designation *
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm 
  bg-white text-gray-800
  focus:ring-2 focus:ring-purple-500 focus:outline-none 
  hover:border-purple-400 transition
  appearance-none"
              >
                <option value="">Select Designation</option>
                <option value="Software Developer">Software Developer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Team Lead">Team Lead</option>
                <option value="Project Manager">Project Manager</option>
              </select>
              {errors.designation && (
                <p className="text-xs text-red-500 mt-1">{errors.designation}</p>
              )}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="2"
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.address ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none`}
              />
              {errors.address && (
                <p className="text-xs text-red-500 mt-1">{errors.address}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none`}
              />
              {errors.dateOfBirth && (
                <p className="text-xs text-red-500 mt-1">{errors.dateOfBirth}</p>
              )}
            </div>

            {/* Education */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Education *
              </label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.education ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none`}
              />
              {errors.education && (
                <p className="text-xs text-red-500 mt-1">{errors.education}</p>
              )}
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary *
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.salary ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none`}
              />
              {errors.salary && (
                <p className="text-xs text-red-500 mt-1">{errors.salary}</p>
              )}
            </div>

            {/* Joining Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Joining Date
              </label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Last Promotion Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Promotion Date
              </label>
              <input
                type="date"
                name="lastPromotionDate"
                value={formData.lastPromotionDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Work Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Location
              </label>
              <select
                name="workLocation"
                value={formData.workLocation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                <option value="">Select Location</option>
                <option value="Office">Office</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>


            {/* Experience */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            {/* About */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                About
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Skills */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills (comma separated)
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, JavaScript, Node.js"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                <option value="On Duty">On Duty</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>

          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-4 border-t bg-white">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployeeModal;




