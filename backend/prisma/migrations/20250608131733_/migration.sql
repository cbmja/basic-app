-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'dormant', 'delete', 'suspend');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('seller', 'vendor');

-- CreateEnum
CREATE TYPE "RestaurantTypeTitle" AS ENUM ('korean', 'chinese', 'japanese', 'thai', 'indian', 'custom', 'other');

-- CreateEnum
CREATE TYPE "MenuType" AS ENUM ('constant', 'variable', 'drink');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "address" TEXT NOT NULL,
    "type" "UserType" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "create_by" TEXT NOT NULL,
    "update_by" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "address" TEXT NOT NULL,
    "open_time" TEXT NOT NULL,
    "close_time" TEXT NOT NULL,
    "break_start_time" TEXT,
    "break_end_time" TEXT,
    "business_hour_desc" TEXT,
    "status" "Status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "create_by" TEXT NOT NULL,
    "update_by" TEXT NOT NULL,

    CONSTRAINT "restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_type" (
    "id" UUID NOT NULL,
    "title" "RestaurantTypeTitle" NOT NULL,
    "custom" TEXT,
    "status" "Status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "create_by" TEXT NOT NULL,
    "update_by" TEXT NOT NULL,

    CONSTRAINT "restaurant_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_type_relation" (
    "id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "restaurant_type_id" UUID NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "create_by" TEXT NOT NULL,
    "update_by" TEXT NOT NULL,

    CONSTRAINT "restaurant_type_relation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "type" "MenuType" NOT NULL,
    "price" TEXT NOT NULL,
    "desc" TEXT,
    "status" "Status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "create_by" TEXT NOT NULL,
    "update_by" TEXT NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "auth_code" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "create_by" TEXT NOT NULL,
    "update_by" TEXT NOT NULL,

    CONSTRAINT "auth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_name_email_key" ON "user"("name", "email");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_type_title_custom_key" ON "restaurant_type"("title", "custom");

-- AddForeignKey
ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_type_relation" ADD CONSTRAINT "restaurant_type_relation_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_type_relation" ADD CONSTRAINT "restaurant_type_relation_restaurant_type_id_fkey" FOREIGN KEY ("restaurant_type_id") REFERENCES "restaurant_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
