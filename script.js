document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navItems = document.querySelectorAll('nav li');
    const tabContents = document.querySelectorAll('.tab-content');
    const menuItemModal = document.getElementById('menu-item-modal');
    const newOrderModal = document.getElementById('new-order-modal');
    const closeButtons = document.querySelectorAll('.close');
    const addMenuItemBtn = document.getElementById('add-menu-item');
    const newOrderBtn = document.getElementById('new-order-btn');
    const menuItemForm = document.getElementById('menu-item-form');
    const newOrderForm = document.getElementById('new-order-form');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const orderStatusFilter = document.getElementById('order-status-filter');
    const menuItemsContainer = document.getElementById('menu-items-container');
    const ordersContainer = document.getElementById('orders-container');
    const staffContainer = document.getElementById('staff-container');
    const inventoryItems = document.getElementById('inventory-items');
    const orderMenuItems = document.getElementById('order-menu-items');
    const orderSummaryItems = document.getElementById('order-summary-items');
    const orderTotal = document.getElementById('order-total');

    // Sample Data
    let menuItems = [
        {
            id: 1,
            name: "Margherita Pizza",
            description: "Classic pizza with tomato sauce, mozzarella, and basil",
            category: "mains",
            price: 12.99,
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 2,
            name: "Caesar Salad",
            description: "Romaine lettuce, croutons, parmesan cheese with Caesar dressing",
            category: "appetizers",
            price: 8.99,
            image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 3,
            name: "Chocolate Lava Cake",
            description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
            category: "desserts",
            price: 7.99,
            image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 4,
            name: "Iced Tea",
            description: "Freshly brewed iced tea with lemon",
            category: "drinks",
            price: 3.50,
            image: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 5,
            name: "Spaghetti Carbonara",
            description: "Pasta with creamy egg sauce, pancetta, and parmesan",
            category: "mains",
            price: 14.99,
            image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }
    ];

    let orders = [
        {
            id: 1001,
            table: 5,
            customer: "John Smith",
            items: [
                { id: 1, name: "Margherita Pizza", price: 12.99, quantity: 1 },
                { id: 4, name: "Iced Tea", price: 3.50, quantity: 2 }
            ],
            status: "completed",
            timestamp: new Date(Date.now() - 3600000)
        },
        {
            id: 1002,
            table: 3,
            customer: "Sarah Johnson",
            items: [
                { id: 2, name: "Caesar Salad", price: 8.99, quantity: 1 },
                { id: 5, name: "Spaghetti Carbonara", price: 14.99, quantity: 1 }
            ],
            status: "preparing",
            timestamp: new Date(Date.now() - 1800000)
        },
        {
            id: 1003,
            table: 8,
            customer: "Michael Brown",
            items: [
                { id: 1, name: "Margherita Pizza", price: 12.99, quantity: 2 },
                { id: 3, name: "Chocolate Lava Cake", price: 7.99, quantity: 1 }
            ],
            status: "pending",
            timestamp: new Date(Date.now() - 900000)
        }
    ];

    let staff = [
        {
            id: 1,
            name: "Emily Wilson",
            position: "Head Chef",
            email: "emily@restaurant.com",
            phone: "555-0101",
            schedule: "Mon-Fri, 10am-6pm"
        },
        {
            id: 2,
            name: "David Thompson",
            position: "Waiter",
            email: "david@restaurant.com",
            phone: "555-0102",
            schedule: "Tue-Sat, 12pm-8pm"
        },
        {
            id: 3,
            name: "Jessica Lee",
            position: "Manager",
            email: "jessica@restaurant.com",
            phone: "555-0103",
            schedule: "Mon-Sun, 9am-5pm"
        }
    ];

    let inventory = [
        {
            id: 1,
            name: "Flour",
            category: "Dry Goods",
            quantity: 25,
            unit: "kg",
            lastUpdated: new Date(Date.now() - 86400000)
        },
        {
            id: 2,
            name: "Tomatoes",
            category: "Produce",
            quantity: 15,
            unit: "kg",
            lastUpdated: new Date(Date.now() - 43200000)
        },
        {
            id: 3,
            name: "Mozzarella Cheese",
            category: "Dairy",
            quantity: 8,
            unit: "kg",
            lastUpdated: new Date(Date.now() - 21600000)
        },
        {
            id: 4,
            name: "Olive Oil",
            category: "Condiments",
            quantity: 5,
            unit: "liters",
            lastUpdated: new Date(Date.now() - 172800000)
        }
    ];

    // Initialize the app
    function init() {
        renderDashboard();
        renderMenuItems();
        renderOrders();
        renderStaff();
        renderInventory();
        setupEventListeners();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Navigation tabs
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                switchTab(tabId);
            });
        });

        // Modal open/close
        addMenuItemBtn.addEventListener('click', () => menuItemModal.classList.add('active'));
        newOrderBtn.addEventListener('click', () => {
            renderOrderMenuItems();
            newOrderModal.classList.add('active');
        });

        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.closest('.modal').classList.remove('active');
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });

        // Menu category filters
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const category = this.getAttribute('data-category');
                renderMenuItems(category);
            });
        });

        // Order status filter
        orderStatusFilter.addEventListener('change', function() {
            renderOrders(this.value);
        });

        // Form submissions
        menuItemForm.addEventListener('submit', handleAddMenuItem);
        newOrderForm.addEventListener('submit', handleNewOrder);
    }

    // Switch between tabs
    function switchTab(tabId) {
        navItems.forEach(item => {
            if (item.getAttribute('data-tab') === tabId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        tabContents.forEach(content => {
            if (content.id === tabId) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        // Update specific tab content if needed
        if (tabId === 'dashboard') {
            renderDashboard();
        } else if (tabId === 'menu') {
            renderMenuItems();
        } else if (tabId === 'orders') {
            renderOrders();
        } else if (tabId === 'staff') {
            renderStaff();
        } else if (tabId === 'inventory') {
            renderInventory();
        }
    }

    // Dashboard functions
    function renderDashboard() {
        // Update stats
        document.getElementById('today-orders').textContent = orders.length;
        document.getElementById('active-tables').textContent = new Set(orders.map(order => order.table)).size;
        document.getElementById('menu-items').textContent = menuItems.length;
        document.getElementById('staff-on-duty').textContent = staff.length;

        // Render recent orders
        const recentOrdersList = document.getElementById('recent-orders-list');
        recentOrdersList.innerHTML = '';

        // Sort orders by timestamp (newest first)
        const sortedOrders = [...orders].sort((a, b) => b.timestamp - a.timestamp);
        
        // Display up to 5 recent orders
        sortedOrders.slice(0, 5).forEach(order => {
            const total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>#${order.id}</td>
                <td>${order.table}</td>
                <td>${order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}</td>
                <td>$${total.toFixed(2)}</td>
                <td><span class="order-status status-${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
            `;
            recentOrdersList.appendChild(row);
        });
    }

    // Menu functions
    function renderMenuItems(category = 'all') {
        menuItemsContainer.innerHTML = '';

        const filteredItems = category === 'all' 
            ? menuItems 
            : menuItems.filter(item => item.category === category);

        if (filteredItems.length === 0) {
            menuItemsContainer.innerHTML = '<p class="no-items">No menu items found</p>';
            return;
        }

        filteredItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <div class="menu-item-img" style="background-image: url('${item.image || 'https://via.placeholder.com/300x180?text=No+Image'}')"></div>
                <div class="menu-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="menu-item-footer">
                        <span class="price">$${item.price.toFixed(2)}</span>
                        <div class="menu-item-actions">
                            <button class="edit-btn"><i class="fas fa-edit"></i> Edit</button>
                            <button class="delete-btn"><i class="fas fa-trash"></i> Delete</button>
                        </div>
                    </div>
                </div>
            `;

            // Add event listeners to action buttons
            const editBtn = menuItem.querySelector('.edit-btn');
            const deleteBtn = menuItem.querySelector('.delete-btn');

            editBtn.addEventListener('click', () => editMenuItem(item.id));
            deleteBtn.addEventListener('click', () => deleteMenuItem(item.id));

            menuItemsContainer.appendChild(menuItem);
        });
    }

    function handleAddMenuItem(e) {
        e.preventDefault();

        const newItem = {
            id: menuItems.length > 0 ? Math.max(...menuItems.map(item => item.id)) + 1 : 1,
            name: document.getElementById('item-name').value,
            description: document.getElementById('item-description').value,
            category: document.getElementById('item-category').value,
            price: parseFloat(document.getElementById('item-price').value),
            image: document.getElementById('item-image').value
        };

        menuItems.push(newItem);
        renderMenuItems();
        menuItemForm.reset();
        menuItemModal.classList.remove('active');
    }

    function editMenuItem(id) {
        const item = menuItems.find(item => item.id === id);
        if (!item) return;

        document.getElementById('item-name').value = item.name;
        document.getElementById('item-description').value = item.description;
        document.getElementById('item-category').value = item.category;
        document.getElementById('item-price').value = item.price;
        document.getElementById('item-image').value = item.image || '';

        menuItemModal.classList.add('active');

        // Update form to handle edit instead of add
        menuItemForm.removeEventListener('submit', handleAddMenuItem);
        menuItemForm.addEventListener('submit', function(e) {
            e.preventDefault();

            item.name = document.getElementById('item-name').value;
            item.description = document.getElementById('item-description').value;
            item.category = document.getElementById('item-category').value;
            item.price = parseFloat(document.getElementById('item-price').value);
            item.image = document.getElementById('item-image').value;

            renderMenuItems();
            menuItemForm.reset();
            menuItemModal.classList.remove('active');

            // Revert to add functionality
            menuItemForm.removeEventListener('submit', arguments.callee);
            menuItemForm.addEventListener('submit', handleAddMenuItem);
        });
    }

    function deleteMenuItem(id) {
        if (confirm('Are you sure you want to delete this menu item?')) {
            menuItems = menuItems.filter(item => item.id !== id);
            renderMenuItems();
        }
    }

    // Order functions
    function renderOrders(statusFilter = 'all') {
        ordersContainer.innerHTML = '';

        const filteredOrders = statusFilter === 'all' 
            ? orders 
            : orders.filter(order => order.status === statusFilter);

        if (filteredOrders.length === 0) {
            ordersContainer.innerHTML = '<p class="no-orders">No orders found</p>';
            return;
        }

        // Sort orders by status and timestamp
        const statusOrder = { pending: 1, preparing: 2, ready: 3, completed: 4 };
        const sortedOrders = [...filteredOrders].sort((a, b) => {
            if (statusOrder[a.status] !== statusOrder[b.status]) {
                return statusOrder[a.status] - statusOrder[b.status];
            }
            return a.timestamp - b.timestamp;
        });

        sortedOrders.forEach(order => {
            const total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const orderCard = document.createElement('div');
            orderCard.className = 'order-card';
            orderCard.innerHTML = `
                <div class="order-header">
                    <span class="order-id">Order #${order.id}</span>
                    <span class="order-status status-${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                </div>
                <div class="order-details">
                    <div class="order-items">
                        ${order.items.map(item => `
                            <div class="order-item">
                                <span>${item.quantity}x ${item.name}</span>
                                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="order-total">Total: $${total.toFixed(2)}</div>
                <div class="order-actions">
                    ${order.status !== 'completed' ? `
                        <button class="next-status-btn" data-id="${order.id}">
                            ${order.status === 'pending' ? 'Start Preparing' : 
                              order.status === 'preparing' ? 'Mark as Ready' : 
                              'Complete Order'}
                        </button>
                    ` : ''}
                    <button class="delete-order-btn" data-id="${order.id}">Delete</button>
                </div>
            `;

            // Add event listeners to action buttons
            const nextStatusBtn = orderCard.querySelector('.next-status-btn');
            const deleteOrderBtn = orderCard.querySelector('.delete-order-btn');

            if (nextStatusBtn) {
                nextStatusBtn.addEventListener('click', () => updateOrderStatus(order.id));
            }
            deleteOrderBtn.addEventListener('click', () => deleteOrder(order.id));

            ordersContainer.appendChild(orderCard);
        });
    }

    function renderOrderMenuItems() {
        orderMenuItems.innerHTML = '';
        orderSummaryItems.innerHTML = '';
        orderTotal.textContent = '0.00';

        menuItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-selection-item';
            menuItem.innerHTML = `
                <span>${item.name} ($${item.price.toFixed(2)})</span>
                <div>
                    <button class="decrement-qty" data-id="${item.id}">-</button>
                    <input type="number" min="0" value="0" data-id="${item.id}" data-price="${item.price}" data-name="${item.name}">
                    <button class="increment-qty" data-id="${item.id}">+</button>
                </div>
            `;

            const input = menuItem.querySelector('input');
            const decrementBtn = menuItem.querySelector('.decrement-qty');
            const incrementBtn = menuItem.querySelector('.increment-qty');

            input.addEventListener('change', updateOrderSummary);
            decrementBtn.addEventListener('click', () => {
                if (parseInt(input.value) > 0) {
                    input.value = parseInt(input.value) - 1;
                    updateOrderSummary();
                }
            });
            incrementBtn.addEventListener('click', () => {
                input.value = parseInt(input.value) + 1;
                updateOrderSummary();
            });

            orderMenuItems.appendChild(menuItem);
        });
    }

    function updateOrderSummary() {
        orderSummaryItems.innerHTML = '';
        let total = 0;

        const inputs = orderMenuItems.querySelectorAll('input');
        inputs.forEach(input => {
            const quantity = parseInt(input.value);
            if (quantity > 0) {
                const itemId = input.getAttribute('data-id');
                const itemName = input.getAttribute('data-name');
                const itemPrice = parseFloat(input.getAttribute('data-price'));
                const itemTotal = itemPrice * quantity;

                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${quantity}x ${itemName}</span>
                    <span>$${itemTotal.toFixed(2)}</span>
                `;
                orderSummaryItems.appendChild(li);

                total += itemTotal;
            }
        });

        orderTotal.textContent = total.toFixed(2);
    }

    function handleNewOrder(e) {
        e.preventDefault();

        const table = document.getElementById('order-table').value;
        const customer = document.getElementById('order-customer').value || 'Anonymous';

        const items = [];
        const inputs = orderMenuItems.querySelectorAll('input');
        inputs.forEach(input => {
            const quantity = parseInt(input.value);
            if (quantity > 0) {
                items.push({
                    id: parseInt(input.getAttribute('data-id')),
                    name: input.getAttribute('data-name'),
                    price: parseFloat(input.getAttribute('data-price')),
                    quantity: quantity
                });
            }
        });

        if (items.length === 0) {
            alert('Please add at least one item to the order');
            return;
        }

        const newOrder = {
            id: orders.length > 0 ? Math.max(...orders.map(order => order.id)) + 1 : 1001,
            table: parseInt(table),
            customer: customer,
            items: items,
            status: 'pending',
            timestamp: new Date()
        };

        orders.push(newOrder);
        renderOrders();
        newOrderForm.reset();
        newOrderModal.classList.remove('active');
    }

    function updateOrderStatus(orderId) {
        const order = orders.find(o => o.id === orderId);
        if (!order) return;

        if (order.status === 'pending') {
            order.status = 'preparing';
        } else if (order.status === 'preparing') {
            order.status = 'ready';
        } else if (order.status === 'ready') {
            order.status = 'completed';
        }

        renderOrders(orderStatusFilter.value);
    }

    function deleteOrder(orderId) {
        if (confirm('Are you sure you want to delete this order?')) {
            orders = orders.filter(order => order.id !== orderId);
            renderOrders(orderStatusFilter.value);
        }
    }

    // Staff functions
    function renderStaff() {
        staffContainer.innerHTML = '';

        if (staff.length === 0) {
            staffContainer.innerHTML = '<p class="no-staff">No staff members found</p>';
            return;
        }

        staff.forEach(staffMember => {
            const staffCard = document.createElement('div');
            staffCard.className = 'staff-card';
            staffCard.innerHTML = `
                <div class="staff-header">
                    <div class="staff-avatar">
                        ${staffMember.name.charAt(0)}
                    </div>
                    <div>
                        <div class="staff-name">${staffMember.name}</div>
                        <div class="staff-position">${staffMember.position}</div>
                    </div>
                </div>
                <div class="staff-details">
                    <p><i class="fas fa-envelope"></i> ${staffMember.email}</p>
                    <p><i class="fas fa-phone"></i> ${staffMember.phone}</p>
                    <p><i class="fas fa-calendar-alt"></i> ${staffMember.schedule}</p>
                </div>
                <div class="staff-actions">
                    <button class="edit-staff-btn" data-id="${staffMember.id}"><i class="fas fa-edit"></i> Edit</button>
                    <button class="delete-staff-btn" data-id="${staffMember.id}"><i class="fas fa-trash"></i> Delete</button>
                </div>
            `;

            // Add event listeners to action buttons
            const editBtn = staffCard.querySelector('.edit-staff-btn');
            const deleteBtn = staffCard.querySelector('.delete-staff-btn');

            editBtn.addEventListener('click', () => editStaff(staffMember.id));
            deleteBtn.addEventListener('click', () => deleteStaff(staffMember.id));

            staffContainer.appendChild(staffCard);
        });
    }

    function editStaff(id) {
        // Implementation would be similar to editMenuItem
        alert('Edit staff functionality would be implemented here');
    }

    function deleteStaff(id) {
        if (confirm('Are you sure you want to delete this staff member?')) {
            staff = staff.filter(member => member.id !== id);
            renderStaff();
        }
    }

    // Inventory functions
    function renderInventory() {
        inventoryItems.innerHTML = '';

        if (inventory.length === 0) {
            inventoryItems.innerHTML = '<tr><td colspan="6" class="no-inventory">No inventory items found</td></tr>';
            return;
        }

        inventory.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td class="${item.quantity < 5 ? 'low-stock' : ''}">${item.quantity}</td>
                <td>${item.unit}</td>
                <td>${item.lastUpdated.toLocaleDateString()}</td>
                <td>
                    <button class="edit-inventory-btn" data-id="${item.id}"><i class="fas fa-edit"></i></button>
                    <button class="delete-inventory-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;

            // Add event listeners to action buttons
            const editBtn = row.querySelector('.edit-inventory-btn');
            const deleteBtn = row.querySelector('.delete-inventory-btn');

            editBtn.addEventListener('click', () => editInventoryItem(item.id));
            deleteBtn.addEventListener('click', () => deleteInventoryItem(item.id));

            inventoryItems.appendChild(row);
        });
    }

    function editInventoryItem(id) {
        // Implementation would be similar to editMenuItem
        alert('Edit inventory item functionality would be implemented here');
    }

    function deleteInventoryItem(id) {
        if (confirm('Are you sure you want to delete this inventory item?')) {
            inventory = inventory.filter(item => item.id !== id);
            renderInventory();
        }
    }

    // Initialize the application
    init();
});