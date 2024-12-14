const logActivity = async (userAction, language = '') => {
    try {
      await fetch('http://localhost:5000/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userAction, language }),
      });
    } catch (error) {
      console.error('Failed to log activity:', error);
    }
  };
  
  export default logActivity;
  