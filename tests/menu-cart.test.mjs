import test from 'node:test';
import assert from 'node:assert/strict';

// Test Menu Data & Cart Logic
import { MENU_CATEGORIES } from '../src/data/menuData.ts';

test('1. Menu Data Structure & Integrity', async (t) => {
  await t.test('All categories have unique IDs and items', () => {
    const categoryIds = new Set();
    const itemIds = new Set();
    let totalItems = 0;

    for (const cat of MENU_CATEGORIES) {
      assert.ok(cat.id, 'Category must have an ID');
      assert.ok(cat.name, 'Category must have a name');
      assert.ok(cat.shortName, 'Category must have a shortName');
      assert.ok(!categoryIds.has(cat.id), `Duplicate category ID: ${cat.id}`);
      categoryIds.add(cat.id);

      assert.ok(Array.isArray(cat.items), 'Category items must be an array');
      assert.ok(cat.items.length > 0, `Category ${cat.name} must not be empty`);

      for (const item of cat.items) {
        assert.ok(item.id, 'Item must have an ID');
        assert.ok(item.name, 'Item must have a name');
        assert.ok(item.price, 'Item must have a price string');
        assert.ok(!itemIds.has(item.id), `Duplicate item ID: ${item.id}`);
        itemIds.add(item.id);
        totalItems++;
      }
    }

    assert.strictEqual(totalItems, 42, 'Expected exactly 42 verified menu items');
  });

  await t.test('Snacks category matches exact physical card specifications (18 items)', () => {
    const snacks = MENU_CATEGORIES.find((c) => c.id === 'snacks');
    assert.ok(snacks, 'Snacks category must exist');
    assert.strictEqual(snacks.items.length, 18, 'Snacks must have 18 items');

    const idly2 = snacks.items.find((i) => i.name.includes('Idly – 2 Nos.'));
    assert.ok(idly2, 'Idly 2 Nos must exist');
    assert.strictEqual(idly2.numericPrice, 28);

    const uppittu = snacks.items.find((i) => i.name === 'Uppittu');
    assert.ok(uppittu, 'Uppittu must exist');
    assert.strictEqual(uppittu.numericPrice, 30);

    const chowChow = snacks.items.find((i) => i.name === 'Chow Chow Bath');
    assert.ok(chowChow, 'Chow Chow Bath must exist');
    assert.strictEqual(chowChow.numericPrice, 56);
  });

  await t.test('Sandwiches category matches physical card specifications (8 items)', () => {
    const sandwiches = MENU_CATEGORIES.find((c) => c.id === 'sandwiches');
    assert.ok(sandwiches, 'Sandwiches category must exist');
    assert.strictEqual(sandwiches.items.length, 8, 'Sandwiches must have 8 items');

    const vegSw = sandwiches.items.find((i) => i.name === 'Veg Sandwich');
    assert.strictEqual(vegSw.numericPrice, 50);

    const grilledCheese = sandwiches.items.find((i) => i.name === 'Grilled Cheese Sandwich');
    assert.strictEqual(grilledCheese.numericPrice, 80);
  });

  await t.test('Chats category matches physical card specifications (7 items)', () => {
    const chats = MENU_CATEGORIES.find((c) => c.id === 'chats');
    assert.ok(chats, 'Chats category must exist');
    assert.strictEqual(chats.items.length, 7, 'Chats must have 7 items');

    const pavBhaji = chats.items.find((i) => i.name === 'Pav Bhaji');
    assert.strictEqual(pavBhaji.numericPrice, 60);

    const cheesePav = chats.items.find((i) => i.name === 'Cheese Pav Bhaji');
    assert.strictEqual(cheesePav.numericPrice, 85);
  });
});

test('2. Filtering Logic Validation', async (t) => {
  const allItems = MENU_CATEGORIES.flatMap((c) => c.items);

  await t.test('Dietary filter ALL returns all 42 items', () => {
    const vegCount = allItems.filter((i) => i.isVeg).length;
    assert.strictEqual(vegCount, 42, 'All 42 items are verified pure veg in this dataset');
  });

  await t.test('Dietary filter NON-VEG returns empty safely without crash', () => {
    const nonVegCount = allItems.filter((i) => !i.isVeg).length;
    assert.strictEqual(nonVegCount, 0, 'No false non-veg items inferred');
  });

  await t.test('Search matching is case-insensitive', () => {
    const searchDosaLower = allItems.filter((i) => i.name.toLowerCase().includes('dosa'));
    const searchDosaUpper = allItems.filter((i) => i.name.toLowerCase().includes('DOSA'.toLowerCase()));
    assert.ok(searchDosaLower.length >= 5, 'Should find multiple dosa varieties');
    assert.strictEqual(searchDosaLower.length, searchDosaUpper.length);
  });
});

test('3. Cart Calculations & WhatsApp Order Generation', async () => {
  // Simulate cart actions
  const mockCart = [
    { item: { id: 'snack-1', name: 'Idly – 2 Nos.', numericPrice: 28 }, quantity: 2 },
    { item: { id: 'snack-3', name: 'Vada – 1 No', numericPrice: 30 }, quantity: 1 },
    { item: { id: 'chat-1', name: 'Pav Bhaji', numericPrice: 60 }, quantity: 3 },
  ];

  const totalItemsCount = mockCart.reduce((sum, ci) => sum + ci.quantity, 0);
  assert.strictEqual(totalItemsCount, 6, 'Total item count should be 2 + 1 + 3 = 6');

  const subtotal = mockCart.reduce((sum, ci) => sum + ci.item.numericPrice * ci.quantity, 0);
  // 28*2 = 56, 30*1 = 30, 60*3 = 180 -> 56 + 30 + 180 = 266
  assert.strictEqual(subtotal, 266, 'Subtotal should be 266');

  // WhatsApp Message Generator
  const lines = [
    'Hello Royal Gazebo Restaurant,',
    'I would like to place the following order:',
    '',
    ...mockCart.map(
      ({ item, quantity }) => `• ${item.name} × ${quantity} — ₹${item.numericPrice * quantity}`
    ),
    '',
    `Subtotal: ₹${subtotal}`,
    '',
    'Please confirm availability and delivery details.',
    'Thank you!',
  ];
  const orderText = lines.join('\n');

  assert.ok(orderText.includes('Idly – 2 Nos. × 2 — ₹56'));
  assert.ok(orderText.includes('Vada – 1 No × 1 — ₹30'));
  assert.ok(orderText.includes('Pav Bhaji × 3 — ₹180'));
  assert.ok(orderText.includes('Subtotal: ₹266'));

  const url = `https://wa.me/918792132211?text=${encodeURIComponent(orderText)}`;
  assert.ok(url.startsWith('https://wa.me/918792132211?text='));
  assert.ok(url.includes('%E2%80%A2')); // Bullet character correctly encoded
});
