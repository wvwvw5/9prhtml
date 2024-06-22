document.addEventListener('DOMContentLoaded', () => {
    const carForm = document.getElementById('carForm');
    const carList = document.getElementById('carList');
    const editModal = document.getElementById('editModal');
    const editCarForm = document.getElementById('editCarForm');
    const closeModal = document.getElementsByClassName('close')[0];

    let cars = [];
    let currentEditIndex = null;

    class Car {
        constructor(model, brand, year, color) {
            this.model = model;
            this.brand = brand;
            this.year = year;
            this.color = color;
        }
    }

    function addCar(car) {
        cars.push(car);
        renderCars();
    }

    function updateCar(index, updatedCar) {
        cars[index] = updatedCar;
        renderCars();
    }

    function deleteCar(index) {
        cars.splice(index, 1);
        renderCars();
    }

    function renderCars() {
        carList.innerHTML = '';
        cars.forEach((car, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${car.model} (${car.brand}) - ${car.year} - ${car.color}</span>
                <button onclick="openEditModal(${index})">Edit</button>
                <button onclick="deleteCar(${index})">Delete</button>
            `;
            carList.appendChild(li);
        });
    }

    carForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const model = document.getElementById('carModel').value;
        const brand = document.getElementById('carBrand').value;
        const year = document.getElementById('carYear').value;
        const color = document.getElementById('carColor').value;

        if (model && brand && year && color) {
            const newCar = new Car(model, brand, parseInt(year), color);
            addCar(newCar);
            carForm.reset();
        } else {
            alert('Please fill out all fields');
        }
    });

    editCarForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const model = document.getElementById('editCarModel').value;
        const brand = document.getElementById('editCarBrand').value;
        const year = document.getElementById('editCarYear').value;
        const color = document.getElementById('editCarColor').value;

        if (model && brand && year && color) {
            const updatedCar = new Car(model, brand, parseInt(year), color);
            updateCar(currentEditIndex, updatedCar);
            editModal.style.display = 'none';
            currentEditIndex = null;
        } else {
            alert('Please fill out all fields');
        }
    });

    window.openEditModal = (index) => {
        currentEditIndex = index;
        const car = cars[index];
        document.getElementById('editCarModel').value = car.model;
        document.getElementById('editCarBrand').value = car.brand;
        document.getElementById('editCarYear').value = car.year;
        document.getElementById('editCarColor').value = car.color;
        editModal.style.display = 'block';
    }

    closeModal.onclick = () => {
        editModal.style.display = 'none';
    }

    window.deleteCar = deleteCar; // Make deleteCar function available in the global scope

    window.onclick = (event) => {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    }
});
