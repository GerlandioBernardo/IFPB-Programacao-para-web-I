-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "vaccinated" BOOLEAN NOT NULL DEFAULT false,
    "deadline_vaccination" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "petShopId" TEXT,
    CONSTRAINT "pets_petShopId_fkey" FOREIGN KEY ("petShopId") REFERENCES "petShops" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_pets" ("created_at", "deadline_vaccination", "description", "id", "name", "petShopId", "type", "vaccinated") SELECT "created_at", "deadline_vaccination", "description", "id", "name", "petShopId", "type", "vaccinated" FROM "pets";
DROP TABLE "pets";
ALTER TABLE "new_pets" RENAME TO "pets";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
