
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { verifyPaymentSuccess } from '@/services/paymentService';
import { Loader2, CheckCircle } from 'lucide-react';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      toast({
        title: 'Invalid request',
        description: 'No session ID was provided',
        variant: 'destructive'
      });
      navigate('/');
      return;
    }
    
    const verifyPayment = async () => {
      try {
        const success = await verifyPaymentSuccess(sessionId);
        setVerificationSuccess(success);
        
        if (success) {
          // Refresh user profile to get updated tier information
          await refreshProfile();
          
          toast({
            title: 'Payment successful',
            description: 'Your plan has been upgraded successfully!',
            variant: 'default'
          });
        } else {
          toast({
            title: 'Verification failed',
            description: 'Could not verify your payment. Please contact support.',
            variant: 'destructive'
          });
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        toast({
          title: 'Verification error',
          description: 'An error occurred while verifying your payment',
          variant: 'destructive'
        });
      } finally {
        setIsVerifying(false);
      }
    };
    
    verifyPayment();
  }, [searchParams, navigate, refreshProfile]);
  
  return (
    <div className="container flex items-center justify-center min-h-screen py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Payment {isVerifying ? 'Processing' : 'Complete'}</CardTitle>
          <CardDescription>
            {isVerifying ? 'Verifying your payment...' : 
             verificationSuccess ? 'Your plan has been upgraded successfully!' : 
             'We could not verify your payment at this time.'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex flex-col items-center justify-center pt-6 pb-8">
          {isVerifying ? (
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
          ) : verificationSuccess ? (
            <CheckCircle className="h-16 w-16 text-primary" />
          ) : (
            <div className="text-center text-muted-foreground">
              <p>There was an issue verifying your payment.</p>
              <p>Please contact our support team for assistance.</p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button onClick={() => navigate('/')} disabled={isVerifying}>
            {isVerifying ? 'Please wait...' : 'Return to Home'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
