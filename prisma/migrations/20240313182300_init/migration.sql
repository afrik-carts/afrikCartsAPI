-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('CUSTOMER', 'VENDOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "CATEGORY" AS ENUM ('FOOD', 'GROCERIES');

-- CreateEnum
CREATE TYPE "ORDER_STATUS" AS ENUM ('DECLINED', 'PENDING', 'PAID', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERING', 'DELIVERED');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20),
    "password" VARCHAR(255) NOT NULL,
    "email_verified_at" TIMESTAMP(3),
    "phone_verified_at" TIMESTAMP(3),
    "role" "ROLE" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_accounts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "opening_time" TIMESTAMP(3) NOT NULL,
    "closing_time" TIMESTAMP(3) NOT NULL,
    "is_open_24hours" BOOLEAN NOT NULL DEFAULT false,
    "profile_image" VARCHAR(255),
    "cover_image" VARCHAR(255),
    "legal_identifier" TEXT NOT NULL,
    "is_approved" BOOLEAN NOT NULL DEFAULT false,
    "category" "CATEGORY" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_accounts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "firstname" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,
    "profile_image" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "vendor_user_id" INTEGER,
    "customer_user_id" INTEGER,
    "fullname" TEXT NOT NULL,
    "phone" VARCHAR(100) NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "state" TEXT,
    "country" VARCHAR(100) NOT NULL DEFAULT 'nigeria',
    "location_description" TEXT,
    "lat" DECIMAL(65,30),
    "long" DECIMAL(65,30),
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "vendor_user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_menus" (
    "id" SERIAL NOT NULL,
    "vendor_user_id" INTEGER NOT NULL,
    "vendor_menu_category_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "wait_time" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "image" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "vendor_user_id" INTEGER NOT NULL,
    "customer_user_id" INTEGER NOT NULL,
    "reference" TEXT NOT NULL,
    "coupon_id" INTEGER,
    "deliveryTime" TIMESTAMP(3),
    "total_price" DECIMAL(65,30) NOT NULL,
    "discounted_price" DECIMAL(65,30) NOT NULL,
    "status" "ORDER_STATUS" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "wait_time" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_delivery_address" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "fullname" TEXT NOT NULL,
    "phone" VARCHAR(100) NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "state" TEXT,
    "country" VARCHAR(100) NOT NULL DEFAULT 'nigeria',
    "location_description" TEXT,
    "lat" DECIMAL(65,30),
    "long" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_delivery_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts" (
    "id" SERIAL NOT NULL,
    "customer_user_id" INTEGER NOT NULL,
    "vendor_user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_items" (
    "id" SERIAL NOT NULL,
    "customer_user_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "cart_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "wait_time" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupons" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_wallets" (
    "id" SERIAL NOT NULL,
    "customer_user_id" INTEGER,
    "vendor_user_id" INTEGER,
    "available_balance" DECIMAL(65,30) DEFAULT 0.00,
    "currency" VARCHAR(20) DEFAULT 'ngn',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "access_tokens" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "access_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vendor_accounts_user_id_key" ON "vendor_accounts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_accounts_user_id_key" ON "customer_accounts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_vendor_user_id_key" ON "addresses"("vendor_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_delivery_address_order_id_key" ON "order_delivery_address"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "coupons_code_key" ON "coupons"("code");

-- CreateIndex
CREATE UNIQUE INDEX "account_wallets_customer_user_id_key" ON "account_wallets"("customer_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "account_wallets_vendor_user_id_key" ON "account_wallets"("vendor_user_id");

-- AddForeignKey
ALTER TABLE "vendor_accounts" ADD CONSTRAINT "vendor_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_accounts" ADD CONSTRAINT "customer_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_vendor_user_id_fkey" FOREIGN KEY ("vendor_user_id") REFERENCES "vendor_accounts"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_customer_user_id_fkey" FOREIGN KEY ("customer_user_id") REFERENCES "customer_accounts"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_vendor_user_id_fkey" FOREIGN KEY ("vendor_user_id") REFERENCES "vendor_accounts"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_menus" ADD CONSTRAINT "vendor_menus_vendor_menu_category_id_fkey" FOREIGN KEY ("vendor_menu_category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_menus" ADD CONSTRAINT "vendor_menus_vendor_user_id_fkey" FOREIGN KEY ("vendor_user_id") REFERENCES "vendor_accounts"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "coupons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_vendor_user_id_fkey" FOREIGN KEY ("vendor_user_id") REFERENCES "vendor_accounts"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_user_id_fkey" FOREIGN KEY ("customer_user_id") REFERENCES "customer_accounts"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "vendor_menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_delivery_address" ADD CONSTRAINT "order_delivery_address_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_customer_user_id_fkey" FOREIGN KEY ("customer_user_id") REFERENCES "customer_accounts"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_vendor_user_id_fkey" FOREIGN KEY ("vendor_user_id") REFERENCES "vendor_accounts"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "vendor_menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_wallets" ADD CONSTRAINT "account_wallets_customer_user_id_fkey" FOREIGN KEY ("customer_user_id") REFERENCES "customer_accounts"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_wallets" ADD CONSTRAINT "account_wallets_vendor_user_id_fkey" FOREIGN KEY ("vendor_user_id") REFERENCES "vendor_accounts"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
