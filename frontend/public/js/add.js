document.getElementById('addEventForm').addEventListener('submit', function (e){
    e.preventDefault();
    const categoryName = document.getElementById('input-category').value;
    const image = document.getElementById('input-image').files[0];
    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('image', image);
    fetch('http://localhost:5000/api/gallery/create', {
        method: 'POST',
        body: formData
    })    
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Event added successfully!');
            window.location.href = '/gallery';  
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting the form.');
    });

//
    fetch("http://127.0.0.1:5000/getCategories")
  .then((response) => response.json())
  .then((data) => console.log("API Response:", data))
  .catch((err) => console.error("API Error:", err));
  //
});
