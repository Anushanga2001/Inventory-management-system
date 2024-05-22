import React from 'react'
import './Edit.css'; // Import the external CSS file
import { Link , useNavigate} from 'react-router-dom';

export default function Edit() {

  const navigate = useNavigate();

  const handleGoBack = () => {
    // Determine the appropriate route based on job position
    const jobPosition = localStorage.getItem('jobPosition');
    switch (jobPosition) {
      case 'owner':
        navigate('/owner/Addusers');
        break;
      case 'stock manager':
        navigate('/stockmanager/Addquantity');
        break;
      case 'sales representative':
        navigate('/salesrep/Placeshoporders');
        break;
      default:
        // Handle other job positions or scenarios
        break;
    }
    navigate(route);
  };

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      navigate("/");
      // Clear the JWT token from local storage
      localStorage.removeItem('token');
      // Clear the job position from local storage
      localStorage.removeItem('jobPosition');
      // Redirect the user to the sign-in page or any other appropriate page
      window.location.href = '/'; // Redirect to sign-in page  
    }
  };

  return (
    <div className="edit-container"> {/* Add a container class */}
      <div className='combi'>
        <Link to='/Changeselect' className="profile-link1"><b>Change password</b></Link>
        <Link to='/Updateprofile' className="profile-link1"><b>Update profile</b></Link>
      </div>
      <div className='signout'>
        <button onClick={handleGoBack} className="custom-button01" style={{ width: '100px' }}>
          <b>Back</b>
        </button>
      </div>
    </div>
  )
}
