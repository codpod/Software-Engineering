-- sample data for SalesAssociates

INSERT INTO SalesAssociates
	(AssociateID, Username, Pass, Name, Commission, Address)
	VALUES(1,
           'EvanS',
 	   	   'SecretPassword',
		   'Evan Siok',
	  	   129.12,
		   '123 Main Street');

INSERT INTO SalesAssociates
	(AssociateID, Username, Pass, Name, Commission, Address)
	VALUES(2,
           'codpod',
		   'MoreSecretPassword',
		   'Cody McAntire',
		   852.91,
		   '221 South Ave');

INSERT INTO SalesAssociates
	(AssociateID, Username, Pass, Name, Commission, Address)
	VALUES(3,
          'Iota',
		  'MostSecretPassword',
		  'Miguel Williams',
		  2831.34,
		  '4182 Western Blvd');

INSERT INTO SalesAssociates
	(AssociateID, Username, Pass, Name, Commission, Address)
	VALUES(4,
           'WSQ',
		   'NotSecretPassword',
		   'Waasiq',
		   572.92,
		   '431 Lake Street');

-- sample data for Quotes

INSERT INTO Quotes
    (QuoteID, CustomerID, AssociateID, Price, isSanctioned, isPurchased, isPercentageDiscount, Discount, Email, Time)
    VALUES (1,
            1, 
            1,
            100000.00, 
            1,
            0, 
            1,
            14.2, 
            'sales@company.com',
            null);

INSERT INTO Quotes
    (QuoteID, CustomerID, AssociateID, Price, isSanctioned, isPurchased, isPercentageDiscount, Discount, Email, Time)
    VALUES (2,
            2, 
            2,
            1234.53, 
            0,
            0,
            1,
            12, 
            'accounts@corporation.com',
            null);

INSERT INTO Quotes
    (QuoteID, CustomerID, AssociateID, Price, isSanctioned, isPurchased, isPercentageDiscount, Discount, Email, Time)
    VALUES (3,
            1, 
            4,
            2048.12, 
            0, 
            0,
            0,
            61.88, 
            'contact@business.com',
            null);


-- sample data for LineItems
INSERT INTO LineItems
    (LineID, QuoteID, ItemDescription, Cost)
    VALUES (1,
            1,
            'Cleaning Service',
            500);

INSERT INTO LineItems
    (LineID, QuoteID, ItemDescription, Cost)
    VALUES (2,
            1,
            'Removal of old machinery',
            1200.12);

INSERT INTO LineItems
    (LineID, QuoteID, ItemDescription, Cost)
    VALUES (3,
            1,
            'New Mixer',
            3200);

INSERT INTO LineItems
    (LineID, QuoteID, ItemDescription, Cost)
    VALUES (1,
            2,
            'New Ventilation installation',
            6400);

INSERT INTO LineItems
    (LineID, QuoteID, ItemDescription, Cost)
    VALUES (2,
            2,
            'Floor Buffing',
            364.94);

INSERT INTO LineItems
    (LineID, QuoteID, ItemDescription, Cost)
    VALUES (1,
            3,
            'New Chimney',
            469.23);

INSERT INTO LineItems
    (LineID, QuoteID, ItemDescription, Cost)
    VALUES (2,
            3,
            'Chimney Installation',
            624.89);

-- sample data for Notes
INSERT INTO Notes
    (NoteID, QuoteID, Note)
    VALUES(1,
           1,
           'machinery cannot fit through loading dock, must be assembled');
           
INSERT INTO Notes
    (NoteID, QuoteID, Note)
    VALUES(1,
           2,
           'Customer is closed on Fridays');

INSERT INTO Notes
    (NoteID, QuoteID, Note)
    VALUES(2,
           2,
           'Can increase discount if necessary to complete sale');
