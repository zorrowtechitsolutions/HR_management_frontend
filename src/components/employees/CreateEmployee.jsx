


import React, { useState, useEffect, useRef } from "react";
import { X, AlertCircle } from "lucide-react";

const CreateEmployeeModal = ({ open, onOpenChange, onSubmit }) => {
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
    workLocation: "",
    skills: ""
  });

  const [errors, setErrors] = useState({});

  // Dropdown states
  const [genderOpen, setGenderOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [designationOpen, setDesignationOpen] = useState(false);
  const [workLocationOpen, setWorkLocationOpen] = useState(false);

  // Refs for dropdowns
  const genderRef = useRef(null);
  const roleRef = useRef(null);
  const designationRef = useRef(null);
  const workLocationRef = useRef(null);

  useEffect(() => {
    if (open) {
      setFormData({
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
        workLocation: "",
        skills: ""
      });
      setErrors({});
      setGenderOpen(false);
      setRoleOpen(false);
      setDesignationOpen(false);
      setWorkLocationOpen(false);
    }
  }, [open]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (genderRef.current && !genderRef.current.contains(event.target)) {
        setGenderOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target)) {
        setRoleOpen(false);
      }
      if (designationRef.current && !designationRef.current.contains(event.target)) {
        setDesignationOpen(false);
      }
      if (workLocationRef.current && !workLocationRef.current.contains(event.target)) {
        setWorkLocationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validate = (data) => {
    const err = {};

    if (!data.firstName.trim()) err.firstName = "Required";
    if (!data.lastName.trim()) err.lastName = "Required";
    if (!data.gender) err.gender = "Required";

    if (!data.mobile) err.mobile = "Required";
    else if (!/^[0-9]{10}$/.test(data.mobile))
      err.mobile = "Must be 10 digits";

    if (!data.email) err.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(data.email))
      err.email = "Invalid email";

    if (!data.password) err.password = "Required";
    else if (
      !/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/.test(data.password)
    )
      err.password = "Weak password (min 6 chars, 1 uppercase, 1 number, 1 special)";

    if (data.confirmPassword !== data.password)
      err.confirmPassword = "Passwords do not match";

    if (!data.department) err.department = "Required";
    if (!data.designation) err.designation = "Required";
    if (!data.address) err.address = "Required";
    if (!data.dateOfBirth) err.dateOfBirth = "Required";
    if (!data.education) err.education = "Required";

    if (!data.salary) err.salary = "Required";
    else if (data.salary <= 0) err.salary = "Invalid";

    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    setErrors(validate(updated));
  };

  const isValid =
    Object.keys(errors).length === 0 &&
    Object.values(formData).every((v) => v !== "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    const payload = {
      ...formData,
      salary: Number(formData.salary),
      skills: formData.skills
        ? formData.skills.split(",").map((s) => s.trim())
        : []
    };
    delete payload.confirmPassword;

    onSubmit(payload);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-xl flex flex-col max-h-[90vh]">

        {/* Header - Sticky */}
        <div className="bg-purple-600 text-white px-6 py-4 flex justify-between items-center rounded-t-lg sticky top-0 z-10">
          <h2 className="text-lg font-semibold">Create Employee</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="hover:bg-purple-700 p-1 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="First name"
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.firstName && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle size={12} className="text-red-500" />
                    <p className="text-xs text-red-500">{errors.firstName}</p>
                  </div>
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
                  placeholder="Last name"
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.lastName && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle size={12} className="text-red-500" />
                    <p className="text-xs text-red-500">{errors.lastName}</p>
                  </div>
                )}
              </div>

              {/* Gender Dropdown */}
              <div className="relative" ref={genderRef}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender *
                </label>
                <div
                  onClick={() => setGenderOpen(!genderOpen)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm flex justify-between items-center cursor-pointer bg-white"
                >
                  <span className={formData.gender ? "text-gray-900" : "text-gray-500"}>
                    {formData.gender || "Select Gender"}
                  </span>
                  <span className="text-gray-500">▼</span>
                </div>
                {genderOpen && (
                  <div className="absolute left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
                    {["Male", "Female"].map((item) => (
                      <div
                        key={item}
                        onClick={() => {
                          setFormData({ ...formData, gender: item });
                          setGenderOpen(false);
                          if (errors.gender) setErrors(prev => ({ ...prev, gender: "" }));
                        }}
                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 flex justify-between ${formData.gender === item ? "bg-gray-100" : ""
                          }`}
                      >
                        {item}
                        {formData.gender === item && <span className="text-gray-900">✓</span>}
                      </div>
                    ))}
                  </div>
                )}
                {errors.gender && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle size={12} className="text-red-500" />
                    <p className="text-xs text-red-500">{errors.gender}</p>
                  </div>
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
                  placeholder="10 digit mobile"
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.mobile ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.mobile && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle size={12} className="text-red-500" />
                    <p className="text-xs text-red-500">{errors.mobile}</p>
                  </div>
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
                  placeholder="Email address"
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.email && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle size={12} className="text-red-500" />
                    <p className="text-xs text-red-500">{errors.email}</p>
                  </div>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.password && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle size={12} className="text-red-500" />
                    <p className="text-xs text-red-500">{errors.password}</p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.confirmPassword && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle size={12} className="text-red-500" />
                    <p className="text-xs text-red-500">{errors.confirmPassword}</p>
                  </div>
                )}
              </div>

              {/* Role Dropdown */}
              <div className="relative" ref={roleRef}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <div
                  onClick={() => setRoleOpen(!roleOpen)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm flex justify-between items-center cursor-pointer bg-white"
                >
                  <span className={formData.role ? "text-gray-900" : "text-gray-500"}>
                    {formData.role || "Select Role"}
                  </span>
                  <span className="text-gray-500">▼</span>
                </div>
                {roleOpen && (
                  <div className="absolute left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-40">
                    {["Intern", "Employee", "Manager", "HR", "Admin"].map((item) => (
                      <div
                        key={item}
                        onClick={() => {
                          setFormData({ ...formData, role: item });
                          setRoleOpen(false);
                        }}
                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 flex justify-between ${formData.role === item ? "bg-gray-100" : ""
                          }`}
                      >
                        {item}
                        {formData.role === item && <span className="text-gray-900">✓</span>}
                      </div>
                    ))}
                  </div>
                )}
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
                  placeholder="Department"
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.department ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.department && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle size={12} className="text-red-500" />
                    <p className="text-xs text-red-500">{errors.department}</p>
                  </div>
                )}
              </div>

              {/* Designation Dropdown */}
              <div className="relative" ref={designationRef}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Designation *
                </label>
                <div
                  onClick={() => setDesignationOpen(!designationOpen)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm flex justify-between items-center cursor-pointer bg-white"
                >
                  <span className={formData.designation ? "text-gray-900" : "text-gray-500"}>
                    {formData.designation || "Select Designation"}
                  </span>
                  <span className="text-gray-500">▼</span>
                </div>
                {designationOpen && (
                  <div className="absolute left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-30">
                    {["Software Developer", "Frontend Developer", "Backend Developer", "Team Lead", "QA Engineer", "DevOps Engineer"].map((item) => (
                      <div
                        key={item}
                        onClick={() => {
                          setFormData({ ...formData, designation: item });
                          setDesignationOpen(false);
                          if (errors.designation) setErrors(prev => ({ ...prev, designation: "" }));
                        }}
                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 flex justify-between ${formData.designation === item ? "bg-gray-100" : ""
                          }`}
                      >
                        {item}
                        {formData.designation === item && <span className="text-gray-900">✓</span>}
                      </div>
                    ))}
                  </div>
                )}
                {errors.designation && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle size={12} className="text-red-500" />
                    <p className="text-xs text-red-500">{errors.designation}</p>
                  </div>
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
                  rows={2}
                  placeholder="Address"
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.address && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle size={12} className="text-red-500" />
                    <p className="text-xs text-red-500">{errors.address}</p>
                  </div>
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
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.dateOfBirth && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle size={12} className="text-red-500" />
                    <p className="text-xs text-red-500">{errors.dateOfBirth}</p>
                  </div>
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
                  placeholder="Education"
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.education ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.education && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle size={12} className="text-red-500" />
                    <p className="text-xs text-red-500">{errors.education}</p>
                  </div>
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
                  placeholder="Salary"
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.salary ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.salary && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle size={12} className="text-red-500" />
                    <p className="text-xs text-red-500">{errors.salary}</p>
                  </div>
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              {/* Work Location Dropdown */}
              <div className="relative" ref={workLocationRef}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Location
                </label>
                <div
                  onClick={() => setWorkLocationOpen(!workLocationOpen)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm flex justify-between items-center cursor-pointer bg-white"
                >
                  <span className={formData.workLocation ? "text-gray-900" : "text-gray-500"}>
                    {formData.workLocation || "Select Location"}
                  </span>
                  <span className="text-gray-500">▼</span>
                </div>
                {workLocationOpen && (
                  <div className="absolute left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-20">
                    {["Office", "Hybrid", "Remote"].map((item) => (
                      <div
                        key={item}
                        onClick={() => {
                          setFormData({ ...formData, workLocation: item });
                          setWorkLocationOpen(false);
                        }}
                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 flex justify-between ${formData.workLocation === item ? "bg-gray-100" : ""
                          }`}
                      >
                        {item}
                        {formData.workLocation === item && <span className="text-gray-900">✓</span>}
                      </div>
                    ))}
                  </div>
                )}
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
                  rows={1}
                  placeholder="Experience details..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
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
                  rows={3}
                  placeholder="About employee..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

            </div>
          </form>
        </div>

        {/* Footer - Sticky Buttons */}
        <div className="px-6 py-4 border-t bg-gray-50 rounded-b-lg sticky bottom-0">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!isValid}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${isValid
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Create Employee
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreateEmployeeModal;