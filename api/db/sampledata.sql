INSERT INTO GiftCards
(cardId, value, soldOn, soldBy, receivedOn, receivedBy)
VALUES
(100, 500, "2019-03-23", "Nikolai", Null, Null),
(110, 100, "2019-04-23", "Nikolai", Null, Null),
(120, 300, "2019-05-02", "Nikolai", Null, Null),
(130, 600, "2019-06-29", "Nikolai", Null, Null),
(140, 900, "2019-08-13", "Nikolai", Null, Null);

INSERT INTO TodosTemplates
(monday, tuesday, wednesday, thursday, friday, saturday, message)
VALUES
(1, 1, 1, 1, 1, 1, "Take out the trash"),
(1, 1, 1, 1, 1, 1, "Clean the toilet"),
(1, 1, 1, 1, 1, 1, "Vacuum the carpets"),
(1, 1, 1, 1, 1, 1, "Count tickets"),
(1, 1, 1, 1, 1, 1, "Sort receipts"),
(1, 1, 1, 1, 1, 1, "Count the lotto cash"),
(1, 1, 1, 1, 1, 1, "Clean the coffe machine"),
(1, 1, 1, 1, 1, 1, "Sort out the vensafe"),
(1, 0, 0, 1, 0, 0, "Clean the coffe machine milk container");

INSERT INTO Users
(email, userName, password)
VALUES
("Nikolainh@hotmail.com", "Nikolai", "$2b$12$tWrX2nWc9nVYmG.gkWG0G.1RsU.uQlB0XX8/A0j1/VjIoTsDOiA8i");
