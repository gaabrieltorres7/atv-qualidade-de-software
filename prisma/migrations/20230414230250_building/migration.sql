-- CreateTable
CREATE TABLE "SubscriptionOnPedais" (
    "ride_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "subscription_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubscriptionOnPedais_pkey" PRIMARY KEY ("ride_id","user_id")
);

-- AddForeignKey
ALTER TABLE "SubscriptionOnPedais" ADD CONSTRAINT "SubscriptionOnPedais_ride_id_fkey" FOREIGN KEY ("ride_id") REFERENCES "Pedais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionOnPedais" ADD CONSTRAINT "SubscriptionOnPedais_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
