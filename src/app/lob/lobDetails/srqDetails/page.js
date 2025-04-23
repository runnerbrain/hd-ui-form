'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import commonStyles from '../../../common/common.module.css';
import homeStyles from '../../../home.module.css';
import styles from '../lobDetails.module.css';


export default function srqDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role'); // Radiologist or Technologist
  const ticketType = searchParams.get('ticketType'); // incident or serviceRequest
  const selectedLOB = searchParams.get('lob'); // PACS, FFI, etc.

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSubform, setSelectedSubform] = useState(null);
  const [formData, setFormData] = useState({
    accession: '',
    mrn: '',
    examDate: '',
    username: '', // For userDetails
    fullName: '', // For userDetails
    email: '',    // For userDetails
    duid: '',         // For wsDetails
    roomNumber: '',   // For wsDetails
    campus: '',       // For wsDetails
    aet: '',         // For modalityDetails
    department: '',  // For modalityDetails
    comments: '',
  });
  const [showPtDetails, setShowPtDetails] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false); // State for toggling visibility
  const [showWsDetails, setShowWsDetails] = useState(false); // State for toggling visibility
  const [showModalityDetails, setShowModalityDetails] = useState(false); // State for toggling visibility




  const radOptions = {

    srqPACS: [
      {label: 'Need Account', subform: 'userDetails'},
      {label: 'PACS on VMWare',subform: 'userDtails'},
      {label: 'Howto', subform: null},
      {label: 'Password reset',subform: 'userDetails'},
      {label: 'Other', subform: null}
    
    ],
      srqFFI: [
        {label: 'Password reset', subform: 'userDetails'},
        {label: 'Other', subform: null}
      ],
      srqVitrea: [
        {label: 'Need Account', subform: 'userDetails'},
        {label: 'Other', subform: null}
      ],
        srqCircle: [
          {label: 'Need Account', subform: 'userDetails'},
        {label: 'Other', subform: null},
        ],
        srqMIM: [
          {label: 'Need Account', subform: 'userDetails'},
          {label: 'Other', subform: null},
        
        ]
      };
    
      const techOptions = {
        srqPACS: [
          {label: 'QC', subform: 'ptDetails'},
          {label: 'Patient demographics issue', subform: 'ptDetails'},
          {lable: 'Other', subform: null}
        ],
        srqVitrea: [
     
          {label: 'Cannot login', subform: 'userDetails'},
       
          {label: 'Other', subform: null}
        ],
        srqCircle: [
        
          {label: 'Cannot login', subform: 'userDetails'},
          {label: 'Study not found', subform: 'ptDetails'},
          {label: 'Issue sending to PACS', subform: 'modalityDetails'},
          {label: 'Issue retrieving from PACS', subform: 'modalityDetails'},
          {label: 'Other', subform: 'ptDetails'}],
        srqMIM: [
          {label :'Slowness', subform: 'wsDetails'},
          {label: 'Cannot login', subform: 'userDetails'},
          {label: 'Study not found', subform: 'ptDetails'},
          {label: 'Issue sending to PACS', subform: 'modalityDetails'},
          {label: 'Issue retrieving from PACS', subform: 'modalityDetails'},
          {label: 'Other', subform: null}],
        srqRapid: [
          {label: 'Results not found', subform: 'ptDetails'},
          {label: 'Issues sending to PACS', subform: 'modalityDetails'},
          {label: 'Rapid down', subform: null}],
        srqMRIBckp: [
          {label: 'Study not found', subform: ['modalityDetails','ptDetails']},
          {label: 'Issue retrieving study', subform: 'ptDetails'},
          {label: 'Server down', subform: null}]
      };
    

  const getOptions = () => {
    const options = role === 'Radiologist' ? radOptions : techOptions;
    const key = `${ticketType}${selectedLOB}`; // E.g., "incPACS"
    return options[key] || [];
  };

  const handleOptionChange = (e) => {
    const selectedLabel = e.target.value;

    // Find the selected issue in the options
    const selectedIssue = getOptions().find((option) => option.label === selectedLabel);

    setSelectedOption(selectedLabel);
    setSelectedSubform(selectedIssue?.subform || null); // Set subform or null
  };

  const renderSubform = () => {
    if (!selectedSubform) {
      // Default to just the comments section if no subform is selected
      return (
        <div>
          <div className={commonStyles.formRow}>
            <label className={commonStyles.label}>Comments:</label>
            <textarea
              name="comments"
              placeholder="Enter your comments here"
              className={commonStyles.textarea}
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            />
          </div>
        </div>
      );
    }
  
    if (Array.isArray(selectedSubform)) {
      const labels = selectedSubform.map((sub) =>
        sub === 'modalityDetails' ? 'modality info' : sub === 'ptDetails' ? 'patient details' : sub
      );
      return (
        <div>
          <div className={commonStyles.formRow}>
            <label className={commonStyles.label}>
              <input type="checkbox" />
              Provide {labels.join(' and ')}
            </label>
          </div>
          {/* Comments Section */}
          <div className={commonStyles.formRow}>
            <label className={commonStyles.label}>Comments:</label>
            <textarea
              name="comments"
              placeholder="Enter your comments here"
              className={commonStyles.textarea}
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            />
          </div>
        </div>
      );
    }

    if (selectedSubform === 'ptDetails') {
      return (
        <div>
          {/* Checkbox to Toggle ptDetails */}
          <div className={commonStyles.formRow}>
            <label className={commonStyles.label}>
              <input
                type="checkbox"
                checked={showPtDetails}
                onChange={() => setShowPtDetails(!showPtDetails)}
              />
              Provide patient details
            </label>
          </div>
    
          {/* ptDetails Fields (Visible When Checkbox is Checked) */}
          {showPtDetails && (
            <>
              <div className={commonStyles.formRow}>
                <label className={commonStyles.label}>Accession:</label>
                <input
                  type="text"
                  name="accession"
                  placeholder="Enter Accession"
                  className={commonStyles.input}
                  value={formData.accession}
                  onChange={(e) => setFormData({ ...formData, accession: e.target.value })}
                />
              </div>
              <div className={commonStyles.formRow}>
                <label className={commonStyles.label}>MRN:</label>
                <input
                  type="text"
                  name="mrn"
                  placeholder="Enter MRN"
                  className={commonStyles.input}
                  value={formData.mrn}
                  onChange={(e) => setFormData({ ...formData, mrn: e.target.value })}
                />
              </div>
              <div className={commonStyles.formRow}>
                <label className={commonStyles.label}>Date of Exam:</label>
                <input
                  type="date"
                  name="examDate"
                  className={commonStyles.input}
                  value={formData.examDate}
                  onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                />
              </div>
            </>
          )}
    
          {/* Comments Section */}
          <div className={commonStyles.formRow}>
            <label className={commonStyles.label}>Comments:</label>
            <textarea
              name="comments"
              placeholder="Enter your comments here"
              className={commonStyles.textarea}
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            />
          </div>
        </div>
      );
    }

    if (selectedSubform === 'userDetails') {
    
      return (
        <div>
          {/* Checkbox to Toggle User Details */}
          <div className={commonStyles.formRow}>
            <label className={commonStyles.label}>
              <input
                type="checkbox"
                checked={showUserDetails}
                onChange={() => setShowUserDetails(!showUserDetails)}
              />
              Provide user account details
            </label>
          </div>
    
          {/* User Details Fields (Visible When Checkbox is Checked) */}
          {showUserDetails && (
            <>
              <div className={commonStyles.formRow}>
                <label className={commonStyles.label}>Username:</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  className={commonStyles.input}
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
              <div className={commonStyles.formRow}>
                <label className={commonStyles.label}>Full Name:</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Last, First"
                  className={commonStyles.input}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              <div className={commonStyles.formRow}>
                <label className={commonStyles.label}>Email:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className={commonStyles.input}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </>
          )}
    
          {/* Comments Section */}
          <div className={commonStyles.formRow}>
            <label className={commonStyles.label}>Comments:</label>
            <textarea
              name="comments"
              placeholder="Enter your comments here"
              className={commonStyles.textarea}
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            />
          </div>
        </div>
      );
    }

    if (selectedSubform === 'wsDetails') {    
      return (
        <div>
          {/* Checkbox to Toggle Workstation Details */}
          <div className={commonStyles.formRow}>
            <label className={commonStyles.label}>
              <input
                type="checkbox"
                checked={showWsDetails}
                onChange={() => setShowWsDetails(!showWsDetails)}
              />
               Provide workstation details
            </label>
          </div>
    
          {/* Workstation Details Fields (Visible When Checkbox is Checked) */}
          {showWsDetails && (
            <>
              <div className={commonStyles.formRow}>
                <label className={commonStyles.label}>DUID:</label>
                <input
                  type="text"
                  name="duid"
                  placeholder="Enter DUID"
                  className={commonStyles.input}
                  value={formData.duid}
                  onChange={(e) => setFormData({ ...formData, duid: e.target.value })}
                />
              </div>
              <div className={commonStyles.formRow}>
                <label className={commonStyles.label}>Room Number:</label>
                <input
                  type="text"
                  name="roomNumber"
                  placeholder="Enter Room Number"
                  className={commonStyles.input}
                  value={formData.roomNumber}
                  onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                />
              </div>
              <div className={commonStyles.formRow}>
                <label className={commonStyles.label}>Campus:</label>
                <select
                  name="campus"
                  className={commonStyles.dropdown}
                  value={formData.campus}
                  onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                >
                  <option value="">Select Campus</option>
                  <option value="UH">UH</option>
                  <option value="VH">VH</option>
                </select>
              </div>
            </>
          )}
    
          {/* Comments Section */}
          <div className={commonStyles.formRow}>
            <label className={commonStyles.label}>Comments:</label>
            <textarea
              name="comments"
              placeholder="Enter your comments here"
              className={commonStyles.textarea}
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            />
          </div>
        </div>
      );
    }

    if (selectedSubform === 'modalityDetails') {
      return (
        <div>
          {/* Checkbox to Toggle Modality Details */}
          <div className={commonStyles.formRow}>
            <label className={commonStyles.label}>
              <input
                type="checkbox"
                checked={showModalityDetails}
                onChange={() => setShowModalityDetails(!showModalityDetails)}
              />
              Provide modality details
            </label>
          </div>
    
          {/* Modality Details Fields (Visible When Checkbox is Checked) */}
          {showModalityDetails && (
            <>
              <div className={commonStyles.formRow}>
                <label className={commonStyles.label}>Campus:</label>
                <select
                  name="campus"
                  className={commonStyles.dropdown}
                  value={formData.campus}
                  onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                >
                  <option value="">Select Campus</option>
                  <option value="UH">UH</option>
                  <option value="VH">VH</option>
                </select>
              </div>
              <div className={commonStyles.formRow}>
                <label className={commonStyles.label}>Room Number:</label>
                <input
                  type="text"
                  name="roomNumber"
                  placeholder="Enter Room Number"
                  className={commonStyles.input}
                  value={formData.roomNumber}
                  onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                />
              </div>
              <div className={commonStyles.formRow}>
                <label className={commonStyles.label}>AET (Optional):</label>
                <input
                  type="text"
                  name="aet"
                  placeholder="Enter AET"
                  className={commonStyles.input}
                  value={formData.aet}
                  onChange={(e) => setFormData({ ...formData, aet: e.target.value })}
                />
              </div>
              <div className={commonStyles.formRow}>
                <label className={commonStyles.label}>Department:</label>
                <select
                  name="department"
                  className={commonStyles.dropdown}
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  <option value="">Select Department</option>
                  <option value="US">US</option>
                  <option value="X-ray">X-ray</option>
                  <option value="CT">CT</option>
                  <option value="MR">MR</option>
                  <option value="IR">IR</option>
                  <option value="NM">NM</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </>
          )}
    
          {/* Comments Section */}
          <div className={commonStyles.formRow}>
            <label className={commonStyles.label}>Comments:</label>
            <textarea
              name="comments"
              placeholder="Enter your comments here"
              className={commonStyles.textarea}
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            />
          </div>
        </div>
      );
    }
    
  
    const labelMap = {
      ptDetails: 'patient details',
      modalityDetails: 'modality info',
      wsDetails: 'workstation details',
      userDetails: 'user account details',
    };
  
    return (
      <div>
        <div className={commonStyles.formRow}>
          <label className={commonStyles.label}>
            <input type="checkbox" />
            Provide {labelMap[selectedSubform] || 'additional details'}
          </label>
        </div>
        {/* Comments Section */}
        <div className={commonStyles.formRow}>
          <label className={commonStyles.label}>Comments:</label>
          <textarea
            name="comments"
            placeholder="Enter your comments here"
            className={commonStyles.textarea}
            value={formData.comments}
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
          />
        </div>
      </div>
    );
  };

  
  return (
    <div className={homeStyles.container}>
      <button onClick={() => router.back()} className={commonStyles.backButton}>
        ⬅ Back
      </button>
      <div className={commonStyles.header}>
        <span>Role: {role}</span>
        <span>Ticket Type: {ticketType}</span>
        <span>LOB: {selectedLOB}</span>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
  {/* Dropdown for Issue Selection */}
  <div className={commonStyles.formRow}>
    <label className={commonStyles.label}>Service needed:</label>
    <select
      className={commonStyles.dropdown}
      value={selectedOption}
      onChange={handleOptionChange}
    >
      <option value="">Select an Issue</option>
      {getOptions().map((option, index) => (
        <option key={index} value={option.label}>
          {option.label}
        </option>
      ))}
    </select>
  </div>

  {/* Render Subform Dynamically */}
  {renderSubform()}

  {/* Submit Button */}
  <div className={commonStyles.formRow}>
    <button
      type="button"
      className={commonStyles.button}
      onClick={() => console.log('Submit', formData)}
    >
      Submit
    </button>
  </div>
</form>

    </div>
  );
}



// 'use client';

// import { useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import commonStyles from '../../../common/common.module.css';
// import homeStyles from '../../../home.module.css';
// import styles from '../lobDetails.module.css';

// export default function SrqDetails() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const role = searchParams.get('role');
//   const ticketType = searchParams.get('ticketType');
//   const selectedLOB = searchParams.get('lob'); // Assuming LOB selection is passed via query

//   const [showExamInfo, setShowExamInfo] = useState(false);
//   const [formData, setFormData] = useState({
//     mrn: '',
//     accession: '',
//     examDate: '',
//     comments: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleCheckboxChange = (e) => {
//     setShowExamInfo(e.target.checked);
//   };

//   const handleSubmit = () => {
//     console.log('Form Data Submitted:', formData);
//     // Add further submit logic here, such as API calls
//   };

//   return (
//     <div className={homeStyles.container}>
//       <button onClick={() => router.back()} className={commonStyles.backButton}>
//         ⬅ Back
//       </button>
//       <div className={commonStyles.header}>
//         <span>Role: {role}</span>
//         <span>Ticket Type: {ticketType}</span>
//         <span>LOB: {selectedLOB}</span>
//       </div>

//       <form className={commonStyles.form} onSubmit={(e) => e.preventDefault()}>
        

//         {/* Comment Section */}
//         <div className={commonStyles.formRow}>
//           <label className={commonStyles.label}>Comments:</label>
//           <textarea
//             name="comments"
//             placeholder="Enter your comments here"
//             className={commonStyles.textarea}
//             value={formData.comments}
//             onChange={handleInputChange}
//           />
//         </div>
//         {/* Checkbox for Exam Info */}
//         <div className={commonStyles.formRow}>
//           <label className={commonStyles.label}>
//             <input
//               type="checkbox"
//               checked={showExamInfo}
//               onChange={handleCheckboxChange}
//             />{' '}
//             Provide exam info
//           </label>
//         </div>

//         {/* Hidden Div for Exam Info */}
//         {showExamInfo && (
//           <div className={commonStyles.formGroup}>
//             <div className={commonStyles.formRow}>
//               <label className={commonStyles.label}>Accession (Required):</label>
//               <input
//                 type="text"
//                 name="accession"
//                 placeholder="Accession Number"
//                 className={commonStyles.input}
//                 value={formData.accession}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className={commonStyles.formRow}>
//               <label className={commonStyles.label}>MRN:</label>
//               <input
//                 type="text"
//                 name="mrn"
//                 placeholder="Medical Record Number"
//                 className={commonStyles.input}
//                 value={formData.mrn}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className={commonStyles.formRow}>
//               <label className={commonStyles.label}>Exam Date:</label>
//               <input
//                 type="date"
//                 name="examDate"
//                 className={commonStyles.input}
//                 value={formData.examDate}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//         )}

//         {/* Submit Button */}
//         <div className={commonStyles.formRow}>
//           <button type="button" className={commonStyles.button} onClick={handleSubmit}>
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
